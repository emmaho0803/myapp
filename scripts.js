// 初始化 Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
    fetch('https://script.google.com/macros/s/AKfycbyv1Jr0tzs7lk4Ev77Usazo3mfw-OxLZdA1urJQW0nqtF_3VCohtaedOeMGjrk75YwhHg/exec', {
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