// console.log('Client side is ready')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{

// response.json().then((data) => {

//     console.log(data)
// })
// })


// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {

//         if (data.error) {
//             console.log(data.error)
//         } else{

//             console.log(data.placeName)
//             console.log(data.forecast)

//         }

       
//     })
// })


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgtwo = document.querySelector('#msg2')


//msgOne.textContent = 'From '

weatherForm.addEventListener('submit', (e) => {

    const location = searchElement.value


    e.preventDefault()

    msgOne.textContent = 'Loading..'
    msgtwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location ).then((response) => {
    response.json().then((data) => {

        if (data.error) {
            //console.log(data.error)
            msgOne.textContent = data.error
        } else{

            // console.log(data.placeName)
            // console.log(data.forecast)

            msgOne.textContent = data.placeName
            msgtwo.textContent = data.forecast

        }

       
    })
})
   
})