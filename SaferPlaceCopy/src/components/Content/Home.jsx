import React from "react";
import TutorialGuide from "./Tutorial";
import Introduction from "./Intro";
import FileInputPlayer from "./Message";



function Home() {
    return(
        <>
        <TutorialGuide/>
        <Introduction/>

        <h1>Welcome User</h1>
        {/* Card to show the Motivational messages received by the server */}


        {/* Text entry or audio download */}
         <FileInputPlayer />
        </>
    )
}

export default Home;