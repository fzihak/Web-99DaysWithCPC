import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import fs from 'fs-extra';
import { resolve } from 'path';

const path = require('path');
const glob = require('glob');

const folder = {
    src: "src/", // source files
    src_assets: "src/assets/", // source assets files
    dist: "dist/", // build files
    dist_assets: "dist/assets/" //build assets files
};

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, folder.src),
        }),
    ],
    base: '',
    // logLevel: 'error', // if you want to disable logging use 'info' | 'warn' | 'error' | 'silent'
    clearScreen: true,
    root: path.resolve(__dirname, folder.src),
    build: {
        outDir: '../dist',
        emptyOutDir: false,
        // watch: {},  // if you want to watch your build files
        rollupOptions: {
            manualChunks: undefined,
            input: {
                icons: folder.src_assets + 'css/icons.css',
                tailwind: folder.src_assets + 'css/tailwind.css',
                ...generateHtmlEntries(),
            },
            output: {
                assetFileNames: (css) => {
                    if (css.name.split('.').pop() == 'css') {
                        return 'assets/css/' + `[name]` + '.css';
                    } else if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(css.name.split('.').pop())) {
                        return 'assets/images/' + css.name;
                    } else {
                        return 'assets/css/' + css.name;
                    }
                },
                entryFileNames: 'assets/js/' + `[name]` + `.js`,
            },
            plugins: [
                // ...other plugins
                require('rollup-plugin-copy')({
                    targets: [
                        { src: folder.src_assets + 'images', dest: folder.dist_assets },
                        { src: folder.src_assets + 'js', dest: folder.dist_assets },
                        { src: folder.src_assets + 'php', dest: folder.dist_assets },
                    ],
                }),
                {
                    name: 'copy-specific-packages',
                    async writeBundle() {
                        const outputPath = path.resolve(__dirname, folder.dist_assets); // Adjust the destination path
                        const outputPathSrc = path.resolve(__dirname, folder.src_assets); // Adjust the destination path
                        const configPath = path.resolve(__dirname, 'package-copy-config.json');

                        try {
                            const configContent = await fs.readFile(configPath, 'utf-8');
                            const { packagesToCopy } = JSON.parse(configContent);

                            for (const packageName of packagesToCopy) {
                                const destPackagePath = path.join(outputPath, 'libs', packageName);
                                const destPackagePathSrc = path.join(outputPathSrc, 'libs', packageName);

                                const sourcePath = (fs.existsSync(path.join(__dirname, 'node_modules', packageName + "/dist"))) ?
                                    path.join(__dirname, 'node_modules', packageName + "/dist")
                                    : path.join(__dirname, 'node_modules', packageName);

                                try {
                                    await fs.access(sourcePath, fs.constants.F_OK);
                                    await fs.copy(sourcePath, destPackagePath);
                                    await fs.copy(sourcePath, destPackagePathSrc);
                                } catch (error) {
                                    console.error(`Package ${packageName} does not exist.`);
                                }
                            }
                        } catch (error) {
                            console.error('Error copying and renaming packages:', error);
                        }
                    },
                },
            ],
        },

    },
    publicDir: 'dist',
    server: {
        port: 8080,
        hot: true
    }
})

function generateHtmlEntries() {
    const entries = {};

    // Modify the glob pattern to match your HTML file location
    const htmlFiles = glob.sync('src/*.html');
    htmlFiles.forEach((file) => {
        const name = file.replace('src/', '').replace('.html', '');
        entries[name] = file;
    });

    return entries;
}
