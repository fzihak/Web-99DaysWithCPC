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
];

function ProjectItem({ project }) {
    return (
        <div className="project-item">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-buttons">
                    <button className="btn btn-code">See Code</button>
                    <button className="btn btn-live">Live Link</button>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <React.Fragment>
            <header>
                <div className="logo">99 Day's Projects</div>
            </header>
            <main>
                <section id="my-projects">
                    <h2>My Projects</h2>
                    <div className="projects-grid">
                        {projectsData.map((project, index) => (
                            <ProjectItem key={index} project={project} />
                        ))}
                    </div>
                </section>
            </main>
            <footer>
                <p>Open Source Project by <a href="https://github.com/fzihak" target="_blank" rel="noopener noreferrer">Foysal Zihak</a></p>
            </footer>
        </React.Fragment>
    );
}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

