import Link from "next/link"


function Home() {
  return <>
    <h1 className="text-4xl font-semibold">Welcome to Augur</h1>
    <h2 className="text-xl font-extralight">A Place For Devs & Their Thoughts</h2>
    <Link className="text-green-400" href="/signup">Signup</Link>
  </> 
  
}

export default Home;
