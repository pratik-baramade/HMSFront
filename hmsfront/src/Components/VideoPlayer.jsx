function VideoPlayer() {
    return (
      <div className="video-container  text-center mt-4">
       
        <video width="80%" autoPlay loop muted>
          <source src="\src\assets\hospital.mp4" type="video/mp4" />
         
        </video>
      </div>
    );
  }
  
  export default VideoPlayer;