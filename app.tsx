import React from 'react'
import { ProjectItem } from './components/ProjectItem'

const projectsData = [
    { title: "Project 1", image: "https://picsum.photos/300/200?random=1" },
    { title: "Project 2", image: "https://picsum.photos/300/200?random=2" },
    { title: "Project 3", image: "https://picsum.photos/300/200?random=3" },
    { title: "Project 4", image: "https://picsum.photos/300/200?random=4" },
    { title: "Project 5", image: "https://picsum.photos/300/200?random=5" },
    { title: "Project 6", image: "https://picsum.photos/300/200?random=6" },
    { title: "Project 7", image: "https://picsum.photos/300/200?random=7" },
    { title: "Project 8", image: "https://picsum.photos/300/200?random=8" },
    { title: "Project 9", image: "https://picsum.photos/300/200?random=9" },
    { title: "Project 10", image: "https://picsum.photos/300/200?random=10" },
    { title: "Project 11", image: "https://picsum.photos/300/200?random=11" },
    { title: "Project 12", image: "https://picsum.photos/300/200?random=12" },
]

export default function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800 py-4 fixed w-full top-0 z-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-bold text-center text-fuchsia-500 animate-pulse">
                        99 Day's Projects
                    </h1>
                </div>
            </header>
            <main className="container mx-auto px-4 pt-20 pb-12">
                <section id="my-projects">
                    <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">My Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsData.map((project, index) => (
                            <ProjectItem key={index} project={project} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>Open Source Project by <a href="https://github.com/fzihak" target="_blank" rel="noopener noreferrer" className="text-fuchsia-500 hover:underline">Foysal Zihak</a></p>
                </div>
            </footer>
        </div>
    )
}

