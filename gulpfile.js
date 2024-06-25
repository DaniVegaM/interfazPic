//GulpFile for Web Automatization
//By: Daniel Vega Miranda

/*
CONTACT for Business:
Facebook: Daniel Vegaam
Instagram: @danielvegaam
*/

/*
This gulpfile help to compile SASS files, optimize images, convert images to webp and avif, and create a sourcemap to
modify easily the style of a webpage with SASS
*/

/*
HOW TO START?
1. Install Node and Gulp in your PC
2. Run from console in your project this command to add all the dependencies: npm i
*/

//Dependencies
import gulp from 'gulp';
// import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
const { src, dest, watch } = gulp;

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass( dartSass );


function css(){
    return src("build/sass/app.scss") //Source SCSS
        .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'expanded'})) //Compile
                /*Make your code compatible with more browsers
                you need to specify them in package.json*/
                .pipe(postcss([autoprefixer(), cssnano()]))
                    .pipe(sourcemaps.write("."))
                        .pipe(dest("build/css")); //Build CSS
}

function images(){
    return src("src/img/**/*")
        .pipe(imagemin({optimizationLevel: 3}))
            .pipe(dest("build/img"));
}

function versionWebp(){
    const options = {
        quality: 75
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(webp(options))
            .pipe(dest("build/img"));
}

function versionAvif(){
    const options = {
        quality: 75
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(avif(options))
            .pipe(dest("build/img"));
}

function dev(){
    //"watch" execute functions automatically
    watch("build/sass/*.scss", css);
    // watch("src/img/**/*", imagenes);
}

//How could you execute a function? : gulp "name of function"
//Example: gulp css

export {dev};