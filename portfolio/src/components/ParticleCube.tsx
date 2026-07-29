import { useEffect, useRef } from 'react';

export function ParticleCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Handle resize
    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    // Particle Setup
    interface Particle {
      cx: number;
      cy: number;
      cz: number;
      dx: number;
      dy: number;
      dz: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const subCubeSize = 50;
    const gap = 16; // Increased gap to make divisions clearer
    const totalSpacing = subCubeSize + gap;

    // Create a cube made of particles (focused on edges for a hollow wireframe look)
    for (let cx = -1; cx <= 1; cx++) {
      for (let cy = -1; cy <= 1; cy++) {
        for (let cz = -1; cz <= 1; cz++) {
          // Generate particles for this cubie
          for (let i = 0; i < 30; i++) { // Decreased particle count for a lighter wireframe
            let dx = (Math.random() - 0.5) * subCubeSize;
            let dy = (Math.random() - 0.5) * subCubeSize;
            let dz = (Math.random() - 0.5) * subCubeSize;
            
            // Snap TWO axes to the edges to create a pure wireframe box
            const edge = Math.floor(Math.random() * 3);
            if (edge === 0) {
              // X is free, Y and Z are snapped
              dy = Math.random() > 0.5 ? subCubeSize/2 : -subCubeSize/2;
              dz = Math.random() > 0.5 ? subCubeSize/2 : -subCubeSize/2;
            } else if (edge === 1) {
              // Y is free, X and Z are snapped
              dx = Math.random() > 0.5 ? subCubeSize/2 : -subCubeSize/2;
              dz = Math.random() > 0.5 ? subCubeSize/2 : -subCubeSize/2;
            } else {
              // Z is free, X and Y are snapped
              dx = Math.random() > 0.5 ? subCubeSize/2 : -subCubeSize/2;
              dy = Math.random() > 0.5 ? subCubeSize/2 : -subCubeSize/2;
            }

            particles.push({
              cx, cy, cz,
              dx, dy, dz,
              size: Math.random() * 2.0 + 1.0,
              alpha: Math.random() * 0.5 + 0.4
            });
          }
        }
      }
    }

    // Animation State
    let globalAngleX = 0;
    let globalAngleY = 0;
    
    interface Move {
      axis: 'x' | 'y' | 'z';
      slice: number;
      dir: number;
    }
    
    const moveQueue: Move[] = [];
    const history: Move[] = [];
    let isSolving = false;
    let currentMove: Move | null = null;
    let moveProgress = 0; // 0 to 1
    const moveSpeed = 0.03; // speed of slice rotation

    // Generate random moves
    const addScrambleMoves = () => {
      const axes: ('x'|'y'|'z')[] = ['x', 'y', 'z'];
      const slices = [-1, 0, 1];
      const dirs = [1, -1];
      for(let i=0; i<6; i++) {
        const move: Move = {
          axis: axes[Math.floor(Math.random() * axes.length)],
          slice: slices[Math.floor(Math.random() * slices.length)],
          dir: dirs[Math.floor(Math.random() * dirs.length)]
        };
        moveQueue.push(move);
        history.push(move);
      }
    };

    addScrambleMoves();

    // 3D rotation helper
    const rotate3D = (x: number, y: number, z: number, pitch: number, yaw: number, roll: number) => {
      let cosa = Math.cos(yaw), sina = Math.sin(yaw);
      let x1 = x * cosa - z * sina;
      let z1 = x * sina + z * cosa;
      let y1 = y;

      let cosb = Math.cos(pitch), sinb = Math.sin(pitch);
      let y2 = y1 * cosb - z1 * sinb;
      let z2 = y1 * sinb + z1 * cosb;
      let x2 = x1;

      let cosc = Math.cos(roll), sinc = Math.sin(roll);
      let x3 = x2 * cosc - y2 * sinc;
      let y3 = x2 * sinc + y2 * cosc;
      let z3 = z2;

      return { x: x3, y: y3, z: z3 };
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Slowly rotate the whole cube
      globalAngleX += 0.005;
      globalAngleY += 0.007;

      // Handle slice moves
      if (!currentMove) {
        if (moveQueue.length > 0) {
          currentMove = moveQueue.shift() || null;
          moveProgress = 0;
        } else {
          // Switch between scrambling and solving
          if (isSolving) {
            isSolving = false;
            setTimeout(addScrambleMoves, 1000); // wait 1s before scrambling again
          } else {
            isSolving = true;
            // Generate reverse moves
            while(history.length > 0) {
              const last = history.pop();
              if (last) {
                moveQueue.push({ axis: last.axis, slice: last.slice, dir: -last.dir });
              }
            }
          }
        }
      }

      let currentAngle = 0;
      if (currentMove) {
        moveProgress += moveSpeed;
        if (moveProgress >= 1) {
          moveProgress = 1;
        }
        
        // Easing function for smooth rotation
        const easeInOut = (t: number) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        currentAngle = easeInOut(moveProgress) * (Math.PI / 2) * currentMove.dir;

        if (moveProgress === 1) {
          // Finalize move: update particle logical coordinates
          particles.forEach(p => {
            if (
              (currentMove!.axis === 'x' && p.cx === currentMove!.slice) ||
              (currentMove!.axis === 'y' && p.cy === currentMove!.slice) ||
              (currentMove!.axis === 'z' && p.cz === currentMove!.slice)
            ) {
              // Rotate by 90 degrees logically
              let nx = p.cx, ny = p.cy, nz = p.cz;
              let ndx = p.dx, ndy = p.dy, ndz = p.dz;

              const dir = currentMove!.dir;
              if (currentMove!.axis === 'x') {
                ny = -p.cz * dir; nz = p.cy * dir;
                ndy = -p.dz * dir; ndz = p.dy * dir;
              } else if (currentMove!.axis === 'y') {
                nx = p.cz * dir; nz = -p.cx * dir;
                ndx = p.dz * dir; ndz = -p.dx * dir;
              } else if (currentMove!.axis === 'z') {
                nx = -p.cy * dir; ny = p.cx * dir;
                ndx = -p.dy * dir; ndy = p.dx * dir;
              }

              p.cx = nx; p.cy = ny; p.cz = nz;
              p.dx = ndx; p.dy = ndy; p.dz = ndz;
            }
          });
          currentMove = null;
        }
      }

      // Draw particles
      const projected = particles.map(p => {
        // Base logical position
        let x = p.cx * totalSpacing + p.dx;
        let y = p.cy * totalSpacing + p.dy;
        let z = p.cz * totalSpacing + p.dz;

        // Apply slice rotation if it's currently moving
        if (currentMove) {
          if (
            (currentMove.axis === 'x' && p.cx === currentMove.slice) ||
            (currentMove.axis === 'y' && p.cy === currentMove.slice) ||
            (currentMove.axis === 'z' && p.cz === currentMove.slice)
          ) {
            let rx = currentMove.axis === 'x' ? currentAngle : 0;
            let ry = currentMove.axis === 'y' ? currentAngle : 0;
            let rz = currentMove.axis === 'z' ? currentAngle : 0;
            const rot = rotate3D(x, y, z, rx, ry, rz);
            x = rot.x; y = rot.y; z = rot.z;
          }
        }

        // Apply global rotation
        const globalRot = rotate3D(x, y, z, globalAngleX, globalAngleY, 0);
        
        // Simple perspective projection (adjusted for larger cube)
        const fov = 400;
        const scale = fov / (fov + globalRot.z);
        const projX = width / 2 + globalRot.x * scale;
        const projY = height / 2 + globalRot.y * scale;

        return { x: projX, y: projY, z: globalRot.z, size: p.size * scale, alpha: p.alpha * scale };
      });

      // Sort by Z to draw back to front (simple depth sorting)
      projected.sort((a, b) => b.z - a.z);

      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
        
        // Add a tiny glow
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      });
      ctx.shadowBlur = 0; // reset

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block mix-blend-screen opacity-90"
    />
  );
}
