import React from "react";
import TutorialGuide from "./Tutorial";
import Introduction from "./Intro";
import FileInputPlayer from "./Message";
import FloatingChatbot from "./Chat";



function Home() {
    return(
        <>
        <Introduction/>

        <h1>Welcome User</h1>
        <p>Login to use all the our tools </p>
        {/* Card to show the Motivational messages received by the server */}


        {/* Text entry or audio download */}
         <FileInputPlayer />
         <div ></div>
         <FloatingChatbot/>
        </>
    )
}

export default Home;