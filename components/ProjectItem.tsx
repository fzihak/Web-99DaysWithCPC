import React from 'react'

interface ProjectItemProps {
    project: {
        title: string;
        image: string;
    }
}

export function ProjectItem({ project }: ProjectItemProps) {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-fuchsia-500">{project.title}</h3>
                <div className="flex justify-between">
                    <button className="px-4 py-2 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 transition-colors duration-300">
                        See Code
                    </button>
                    <button className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors duration-300">
                        Live Link
                    </button>
                </div>
            </div>
        </div>
    )
}

