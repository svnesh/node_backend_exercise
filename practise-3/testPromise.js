function getSum(a,b){
    const myPromise = new Promise((resolve, reject)=>{
        const sum = a+b;
        if (a < 5){
            resolve(sum)
        }else{
            reject(new Error('oops'));
        }
    })

    return myPromise
}

getSum(3,4)
.then(data => {
    console.log('Answer is ' + data);
})