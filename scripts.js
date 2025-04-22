
const firebaseConfig = {

    apiKey: "AIzaSyAPbGUchS9DyAHj2F4WKaj5WPZLJWOUKHY",
  
    authDomain: "rd-project-42546.firebaseapp.com",
  
    projectId: "rd-project-42546",
  
    storageBucket: "rd-project-42546.firebasestorage.app",
  
    messagingSenderId: "688686999845",
  
    appId: "1:688686999845:web:bf3be4032654aa594352cc",
  
    measurementId: "G-3M86CJ12FQ"
  
  };

firebase.initializeApp(firebaseConfig);

// 登入函數
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // 登入成功後跳轉
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      document.getElementById('error').innerText = error.message;
    });
}

// 註冊函數
function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert('註冊成功！');
    })
    .catch(error => {
      document.getElementById('error').innerText = error.message;
    });
}

// 在登入函數中添加
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // 獲取用戶 UID
    const uid = userCredential.user.uid;
    
    // 發送資料到 Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbwI_BTbdnlvQcKsaF5VUx_Qp0cZJ0-AR--8tHqUZY3VoSslzD_f82VD9_Q6Mm3zI0Ef-w/exec', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        name: '新用戶', // 可從表單獲取
        uid: uid
      })
    }).then(() => {
      window.location.href = "dashboard.html";
    });
  });
