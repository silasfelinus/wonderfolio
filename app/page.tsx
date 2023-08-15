import React from "react";
import Butterfly from "@butterfly/Butterfly";
import Butterfly2 from "@butterfly/Butt2";
import Feed from "../components/Feed";

const Home = () => (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Kind Prompts is a resource for discovering, creating, and sharing
        AI-Powered prompts
      </p>

      <Butterfly />
      <Feed />
    </section>
  );

export default Home;
