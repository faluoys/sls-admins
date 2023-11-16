<template>
  <div id="login">
    <!--整体布局-->
    <div ref="containerRef" class="container right-panel-active">
      <!--注册框-->
      <div class="container_form container--signup">
        <el-form class="form"
                 ref="formRegRef"
                 :model="regForm"
                 :rules="regRules"
        >
          <h2 class="form_title">注册账号</h2>
          <el-form-item
              prop="uName"
              name="账号"
          >
            <el-input class="input" prefix-icon="UserFilled" placeholder="请输入用户名"
                      v-model="regForm.uName"/>
          </el-form-item>
          <el-form-item prop="uPwd" name="密码">
            <el-input class="input" prefix-icon="Lock" v-model="regForm.uPwd" show-password
                      type="password"
                      placeholder="请输入密码"
                      autocomplete="off"/>
          </el-form-item>
          <el-form-item prop="uTel" name="电话">
            <el-input class="input" prefix-icon="Iphone" v-model.number="regForm.uTel" type="tel"
                      placeholder="请输入电话"
                      autocomplete="off"/>
          </el-form-item>

          <el-form-item>
            <el-button class="btn" style="margin-left: 60px" @click="submitRegForm">注册</el-button>
            <el-button class="btn" style="margin-left: 60px" @click="resetForm(formRef,formRegRef)">重置
            </el-button>
          </el-form-item>
        </el-form>

      </div>

      <!--登录框-->
      <div class="container_form container--signin">
        <el-form class="form"
                 ref="formRef"
                 :model="loginForm"
                 :rules="loginRules"
        >
          <h2 class="form_title">欢迎登录</h2>
          <el-form-item
              prop="uName"
              name="账号"
          >
            <el-input class="input" prefix-icon="UserFilled" placeholder="请输入用户名"
                      v-model="loginForm.uName"/>
          </el-form-item>
          <el-form-item prop="uPwd" name="密码">
            <el-input class="input" prefix-icon="Lock" v-model="loginForm.uPwd" show-password
                      type="password"
                      placeholder="请输入密码"
                      autocomplete="off"/>
          </el-form-item>
          <a href="#" class="link">忘记密码?</a>

          <el-form-item>
            <el-button class="btn" style="margin-left: 60px" @click="submitForm" @keyup.enter="keyDown">
              登录
            </el-button>
            <el-button class="btn" style="margin-left: 60px" @click="resetForm(formRef,formRegRef)">重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="container_overlay">
        <div class="overlay">
          <div class="overlay_panel overlay--left">
            <div class="rotation">
              <div class="card">
                <img class="face" src="@/assets/img/R.jpg" alt="">
                <div class="back">
                  <span>管理系统</span>
                </div>
              </div>
            </div>
            <button class="btn signin" id="signin" @click="signinBtn">已有帐号，直接登录</button>
          </div>

          <div class="overlay_panel overlay--right">
            <div class="rotation">
              <div class="card">
                <img class="face" src="@/assets/img/R.jpg" alt="">
                <div class="back">
                  <span>管理系统</span>
                </div>
              </div>
            </div>
            <button class="btn signup" id="signup" @click="signupBtn">没有账号，点击注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import {reactive, ref, onMounted, onUnmounted} from 'vue'
import {login, userLoginAccess, getPowerNav} from '@/api/auth.js'
import router from '@/router/index.js'
import {useStore} from '@/store/user.js'
import {ElMessage} from 'element-plus';
import qs from 'qs'

const formRef = ref(null)
const formRegRef = ref(null)
const store = useStore();
//登录
const loginForm = reactive({
  uName: 'admins',
  uPwd: '123456',
  uId: '',
})

//注册
const regForm = reactive({
  uName: '',
  uPwd: '',
  // uId: '',
  uTel: '',
  rId: '',
  uPower: '',
})
const container = reactive({});

const containerRef = ref(null);

const signinBtn = () => {
  // console.log(containerRef)
  containerRef.value.classList.remove("right-panel-active");
}

const signupBtn = () => {
  containerRef.value.classList.add("right-panel-active");
}

const submitRegForm = () => {

}


const submitForm = () => {

  if (loginForm.uName === '' || loginForm.uPwd === '') {
    ElMessage.warning('请输入账户和密码')
  } else {
    login(qs.stringify(loginForm)).then(res => {
      // console.log(loginForm)
      console.log(res)
      console.log(res.token)
      const data = reactive({
        dId: res.dId,
        rId: res.rId,
        uDel: res.uDel,
        uId: res.uId,
        uName: res.uName,
        uPwd: res.uPwd,
        uTel: res.uTel,
        uPower: res.uPower
      })
      store.setUserInfo(data)
      // console.log(store.setUserInfo(data))
      // console.log(store)
      localStorage.setItem('uName', res.uName)
      localStorage.setItem('uPwd', res.uPwd)
      localStorage.setItem('uId', res.uId)
      localStorage.setItem('token', res.token)
      //获取到了uId
      const uId = localStorage.getItem('uId');
      // console.log(11,uId)
      if (loginForm.uName === res.uName && loginForm.uPwd === res.uPwd) {
        userLoginAccess({uId: uId}).then(res => {
          container.value = res
          // console.log(22,res)
          // console.log(3,container.value.uPower)//自定义权限  2,3,4,5
          // console.log(4,container.value.rPower)//角色权限 2,3,4
          const str1 = container.value.uPower + "," + container.value.rPower;
          let arr = str1.split(',');

          let newPowerArr = [...new Set(arr)];//去重 1，2，3，4，5
          //权限列表写入storage
          localStorage.setItem('userPower', newPowerArr);
          // console.log(newPowerArr)
          // console.log(5, typeof newPowerArr)
          // const str = window.localStorage.getItem('userPower')
          const str = localStorage.getItem('userPower');
          console.log(11, typeof str)

          getPowerNav({str: str}).then(res => {
            console.log(22, res)
            localStorage.setItem("powerNav", JSON.stringify(res))
          });
        });

        setTimeout(() => {
          ElMessage.success('登录成功')
          router.push({name: 'index'})
        }, 500)
      } else {
        ElMessage.error('账号或密码错误')
        // alert("账号或密码错误","温馨提示",{
        //     confirmButtonText: '确定',
        // })
      }
    })
  }
}

const keyDown = e => {
  // console.log(e)
  // if (e.keyCode == 13) {
  //     submitForm();
  // }
  if (e.key === "Enter") {
    submitForm();
  }
}

onMounted(() => {
  window.addEventListener('keydown', keyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', keyDown, false)
})

// 验证规则
const loginRules = {
  // 失去焦点时触发
  uName: {required: true, message: "请输入用户名", trigger: "blur"},
  uPwd: {required: true, message: "请输入密码", trigger: "blur"},
};

const regRules = {
  // 失去焦点时触发
  uName: {required: true, message: "请输入用户名", trigger: "blur"},
  uPwd: {required: true, message: "请输入密码", trigger: "blur"},
  uTel: {required: true, message: "请输入电话", trigger: "blur"},
};


const resetForm = (formRef, formRegRef) => {
  if (!formRef || !formRegRef) return
  formRef.resetFields()
  formRegRef.resetFields()
}
</script>

<style scoped>
#login {
  align-items: center;
  background-color: var(--white);
  background-image: url("@/assets/img/bgs.png");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
}

:deep(.el-form-item__error) {
  top: 0;
  left: 5%;
}

.rotation {
  --r: 360deg;
  width: 180px;
  height: 180px;
  background: transparent;
  position: relative;
  border: 2px solid #00c6fb;
  border-radius: 50%;
}

.rotation:before {
  position: absolute;
  top: 15px;
  left: 15px;
  content: "";
  width: 20px;
  height: 20px;
  background-image: linear-gradient(-225deg, #20E2D7 0%, #F9FEA5 100%);
  border-radius: 50%;
}

.rotation,
.card {
  animation: round 6s linear infinite;
}

@keyframes round {
  to {
    transform: rotate(var(--r));
  }
  /*to {*/
  /*    rotate: 360deg;*/
  /*}*/
  /*0% {*/
  /*    rotate: 0deg;*/
  /*}*/
  /*100% {*/
  /*    rotate: 360deg;*/
  /*}*/
}

/*翻转头像*/
.card {
  --r: -360deg;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  /*top: 13px;*/
  /*left: 13px;*/
  margin: 13px auto;
  perspective: 500px;
  cursor: pointer;
}

.face {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transition: .6s;
  backface-visibility: hidden;
}

.back {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  background-color: #73edd3;
  font-size: 25px;
  position: absolute;
  top: 0;
  left: 0;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: .6s;
}

.card:hover .face {
  transform: rotateY(-180deg);
}

.card:hover .back {
  transform: rotateY(0);
}

:deep(.el-button) {
  height: 45px;
}

:deep(.el-form-item) {
  margin-bottom: 0 !important;
}

:deep(.el-input__suffix) {
  position: absolute;
  right: 10px;
}

.form_title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}

.link {
  color: var(--gray);
  font-size: 0.9rem;
  /*margin: 1.5rem 0;*/
  text-decoration: none;
}

.container {
  /*background-color: var(--white);*/
  background-color: transparent;
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.5);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  width: 100%;
}

.container_form {
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;
}

.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .container--signin {
  transform: translateX(100%);
}

.container--signup {
  left: 0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(100%);
  z-index: 5;
}

.container_overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container_overlay {
  transform: translateX(-100%);
}

.overlay {
  /*background-color: var(--lightblue);*/
  background-color: transparent;
  /*background-image: url(../img/beijing.jpg);*/
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 198%;
  /*background-size: cover;*/
  height: 100%;
  left: -100%;
  position: relative;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay_panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn {
  background-color: var(--blue);
  /*background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);*/
  background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);
  border-radius: 20px;
  /*border: 1px solid var(--blue);*/
  color: var(--white);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 10px !important;
}

.form > .btn {
  margin-top: 1.5rem;
}

.btn:active {
  transform: scale(0.95);
}

.btn:focus {
  outline: none;
}

.form {
  /*background-color: var(--white);*/
  /*background-image: linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%);*/
  background-image: linear-gradient(-225deg, #20E2D7 0%, #F9FEA5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
}

.input {
  /*background-color: #fff;*/
  border: none !important;
  padding: 0.9rem 0.9rem;
  /*margin: 0.5rem 0;*/
  width: 100%;
  outline: none !important;
  box-sizing: content-box;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

</style>
