// Listen for the YouTube API ready event
document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the video player element
  var player = document.getElementById("movie_player");
  
  // Create a new custom scroller element
  var scroller = document.createElement("div");
  scroller.style.position = "absolute";
  scroller.style.width = "100%";
  scroller.style.height = "20px";
  scroller.style.backgroundColor = "black";
  scroller.style.opacity = "0.5";
  
  // Add the custom scroller element to the player container
  var container = player.parentNode;
  container.insertBefore(scroller, player);
  
  // Define an array to store the skip points
  var skipPoints = [];
  
  // Add event listeners to the custom scroller
  var dragging = false;
  var startPoint, endPoint;
  scroller.addEventListener("mousedown", function(event) {
    dragging = true;
    startPoint = event.pageX;
  });
  scroller.addEventListener("mousemove", function(event) {
    if (dragging) {
      endPoint = event.pageX;
      // Update the style of the scroller to show the selected region
      scroller.style.backgroundPositionX = startPoint + "px";
      scroller.style.backgroundSize = (endPoint - startPoint) + "px 100%";
    }
  });
  scroller.addEventListener("mouseup", function(event) {
    dragging = false;
    skipPoints.push({start: startPoint, end: endPoint});
  });
  
  // Add a custom button to toggle the visibility of the scroller
  var button = document.createElement("button");
  button.textContent = "Toggle Scroller";
  button.style.position = "absolute";
  button.style.top = "0";
  button.style.right = "0";
  button.addEventListener("click", function() {
    scroller.style.display = (scroller.style.display == "none") ? "block" : "none";
  });
  container.appendChild(button);
  
  // Add a listener for the time update event to check for skip points
  player.addEventListener("timeupdate", function() {
    for (var i = 0; i < skipPoints.length; i++) {
      if (player.getCurrentTime() >= skipPoints[i].start && player.getCurrentTime() <= skipPoints[i].end) {
        player.seekTo(skipPoints[i].end);
      }
    }
  });
});

