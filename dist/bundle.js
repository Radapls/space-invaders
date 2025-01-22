(()=>{"use strict";const e=document.getElementById("canvas"),t=e.getContext("2d");let d="radapls";const h={x:e.width/2,y:e.height-50,width:40,height:40,speed:5,image:new Image};h.image.src="https://cdn-icons-png.flaticon.com/512/1985/1985828.png";const i={x:h.x+h.width/2,y:h.y,radius:5,speed:10,destroyed:!0};let o=[{x:100,y:100,width:50,height:50,destroyed:!1},{x:200,y:200,width:50,height:50,destroyed:!1},{x:300,y:300,width:50,height:50,destroyed:!1}],r=0;function y(t){"left"===t?h.x-=h.speed:"right"===t&&(h.x+=h.speed),h.x<0?h.x=0:h.x>e.width-h.width&&(h.x=e.width-h.width)}function n(){t.clearRect(0,0,e.width,e.height),t.drawImage(h.image,h.x,h.y,h.width,h.height),o.forEach((d=>{d.destroyed||(t.beginPath(),t.rect(d.x,d.y,d.width,d.height),t.shadowBlur=20,t.lineWidth=15,t.fillStyle=function(){const e=["#39d353","#26a641","#006d32","#0e4429"];return e[Math.floor(Math.random()*e.length)]}(),t.lineWidth=2,t.strokeStyle="white",t.fill(),t.closePath(),t.strokeRect(0,0,e.width,e.height))})),t.font="bold 20px Courier New",t.fontKerning,t.fillStyle="white",t.fillText("Score: "+r,8,20),i.destroyed||(t.beginPath(),t.arc(i.x,i.y,i.radius,0,2*Math.PI),t.fillStyle="blue",t.fill(),t.closePath()),o.forEach((t=>{t.destroyed||(t.y+=1,t.y>e.height&&(t.y=0,t.x=Math.random()*e.width))})),o.forEach((e=>{e.destroyed||h.x<e.x+e.width&&h.x+h.width>e.x&&h.y<e.y+e.height&&h.y+h.height>e.y&&(e.destroyed=!0,r++)})),i.destroyed||(i.y-=i.speed,i.y<0&&(i.destroyed=!0),o.forEach((e=>{e.destroyed||i.x>e.x&&i.x<e.x+e.width&&i.y>e.y&&i.y<e.y+e.height&&(e.destroyed=!0,i.destroyed=!0,r++)}))),s.left&&y("left"),s.right&&y("right"),s.up&&(h.y-=h.speed,h.y<0&&(h.y=0)),s.down&&(h.y+=h.speed,h.y>e.height-h.height&&(h.y=e.height-h.height)),requestAnimationFrame(n)}fetch(`https://api.github.com/repos/${d}/${d}.github.io/commits`).then((e=>e.json())).then((t=>{o=t.map((()=>({x:Math.random()*e.width,y:Math.random()*e.height/2,width:12,height:12,destroyed:!1}))),n()}));const s={left:!1,right:!1,down:!1,up:!1};document.addEventListener("keydown",(e=>{"ArrowLeft"===e.code?s.left=!0:"ArrowRight"===e.code?s.right=!0:"ArrowUp"===e.code?s.up=!0:"ArrowDown"===e.code?s.down=!0:"Space"===e.code&&i.destroyed&&(i.destroyed=!1,i.x=h.x+h.width/2,i.y=h.y)})),document.addEventListener("keyup",(e=>{"ArrowLeft"===e.code?s.left=!1:"ArrowRight"===e.code?s.right=!1:"ArrowUp"===e.code?s.up=!1:"ArrowDown"===e.code?s.down=!1:"Space"===e.code&&i.destroyed&&(i.destroyed=!1,i.x=h.x+h.width/2,i.y=h.y)})),document.getElementById("reset-button").addEventListener("click",(()=>{h.x=e.width/2,h.y=e.height-50,r=0,o.forEach((t=>{t.x=Math.random()*e.width,t.y=Math.random()*e.height/2,t.destroyed=!1})),i.x=h.x+h.width/2,i.y=h.y,i.destroyed=!1}))})();