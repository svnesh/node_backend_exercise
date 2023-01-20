//Creating a promise method
let myPromise1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        resolve("Promise 1 resolved!");
    }, 6000)
})

//
let myPromise2 = new Promise((resolve,reject) =>{
    setTimeout(()=>{
        resolve("Promise 2 resolved!");
    }, 3000)
})

console.log("Before calling promise");

myPromise1.then((successMessage) => {
    console.log("From callback 1 " + successMessage);

    myPromise2.then((successMessage) =>{
        console.log("From callback 2 " + successMessage);
    })
})

console.log("after calling both promises");