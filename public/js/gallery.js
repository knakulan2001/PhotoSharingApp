// let size = 0;

// function fadeOutEffect(id) {
//     var e = document.getElementById(`${id}`);
//     var e1 = setInterval(function() {
//         if (!e.style.opacity)
//             e.style.opacity = 1;

//         if (e.style.opacity > 0)
//             e.style.opacity -= 0.3;
//         else {
//             clearInterval(e1);
//             remove(`${id}`);
//             header(--size);
//         }
//     }, 100);
// }

// function remove(id) {
//     let removediv = document.getElementById(`${id}`);
//     removediv.parentNode.removeChild(removediv);
// }

// function header(size) {
//     document.getElementById(
//         "head"
//     ).innerHTML = `<a id="author">Size: ${size}</a>`;
// }

// async function run() {
//     try {
//         let count = 0;
//         let response = await axios.get(
//             "https://jsonplaceholder.typicode.com/albums/2/photos"
//         );
//         size = response.data.length;
//         header(size);

//         response.data.forEach((e) => {
//             addCode(e.title, e.url, count++);
//         });
//     } catch (error) {
//         console.log("error: ", error);
//     }
// }
// run();