import React, { useEffect, useRef } from "react";

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // 🎯 Kam balls aur slow speed
    const balls = Array.from({ length: 10 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 20 + Math.random() * 15, // thoda bada for visibility
      dx: 0.05 + Math.random() * 0.1,  // slow horizontal speed
      dy: 0.05 + Math.random() * 0.1,  // slow vertical speed
      color: `rgba(255,165,0,${Math.random() * 0.4 + 0.2})` // soft orange
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x > width || ball.x < 0) ball.dx *= -1;
        if (ball.y > height || ball.y < 0) ball.dy *= -1;

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default CanvasBackground;
