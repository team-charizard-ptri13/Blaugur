'use client';
import Link from "next/link"
import React from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import MultiSection from "@/components/MultiSection";


function Home() {
  return (
    <>
      <Nav/>
      <Hero/>
      <MultiSection/>
      <Footer/>
    </>
  )
}

export default Home;
