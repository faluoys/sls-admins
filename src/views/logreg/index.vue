<template>
  <div class="login-wrapper">
    <div :class="['login-container', type == 'login' ? 'active' : '']">
      <div class="switch-wrapper row aCenter jCenter">
        <div class="btn-wrapper row aCenter jCenter">
          <div
              v-if="type == 'login'"
              class="txt row aCenter jCenter"
              @click="type = 'register'"
          >
            去注册
          </div>
          <div v-else class="txt row aCenter jCenter" @click="type = 'login'">
            去登录
          </div>
        </div>
      </div>
      <div :class="['outerBox', type == 'login' ? 'active' : '']">
        <div class="container row aCenter jCenter">
          <div class="login" v-show="type == 'login'">
            <el-form
                :model="loginUser"
                status-icon
                :rules="loginRules"
                ref="loginForm"
            >
              <img class="ld" src="@/assets/img/bg.png"/>
              <div class="title">登录</div>
              <el-form-item prop="username">
                <el-input
                    type="text"
                    prefix-icon="el-icon-user"
                    placeholder="请输入账号 / 手机号 / 邮箱"
                    v-model="loginUser.username"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                    type="password"
                    prefix-icon="el-icon-view"
                    placeholder="请输入密码"
                    v-model="loginUser.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="btn-login" @click="login"
                >登录
                </el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="register" v-show="type == 'register'">
            <el-form
                :model="registerUser"
                status-icon
                :rules="registerRules"
                ref="registerForm"
            >
              <img class="ld" src="@/assets/img/bg.png"/>
              <div class="title">注册</div>
              <el-form-item prop="username">
                <el-input
                    type="text"
                    prefix-icon="el-icon-user"
                    placeholder="请输入账号 / 手机号 / 邮箱"
                    v-model="registerUser.username"
                />
              </el-form-item>
              <el-form-item prop="email">
                <el-input
                    type="text"
                    prefix-icon="el-icon-message"
                    placeholder="请输入邮箱地址"
                    v-model="registerUser.email"
                />
              </el-form-item>
              <el-form-item prop="mobile">
                <el-input
                    type="number"
                    prefix-icon="el-icon-mobile"
                    placeholder="请输入手机号码"
                    v-model="registerUser.mobile"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                    type="password"
                    prefix-icon="el-icon-view"
                    placeholder="请输入密码"
                    v-model="registerUser.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="btn-login" @click="register"
                >确认注册
                </el-button
                >
              </el-form-item>
              <!-- <div class='w100 row aCenter jSb'>
                                <el-button type="text" class='forgetPassword' @click="onOpenLogin">返回登录</el-button>
                            </div> -->
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
// import logo1 from '@/assets/images/bg.png'
// import { validUsername } from '@/utils/validate'

export default {
  name: "login",
  data() {
    return {
      type: "login", // 类型判断
      loginUser: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
      },
      registerUser: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      registerRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
        ],
        email: [{required: true, message: "请输入邮箱地址", trigger: "blur"}],
        mobile: [
          {required: true, message: "请输入手机号码", trigger: "blur"},
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
      },
    };
  },
  methods: {
    login() {
      //   this.$refs.loginForm.validate( async valid => {
      //       if(valid) {
      //             await xxx.login(this.loginUser).then(async r => {
      //                 console.log('成功了')
      //             }).catch(e => {
      //                 console.log(e)
      //                 this.Toast(2, '登录失败，请稍后重试')
      //                 return false
      //             })
      //       } else {
      //         return false
      //       }
      //   })
    },
    register() {
      //   this.$refs.registerForm.validate(async valid => {
      //       if(valid) {
      //             await xxx.register(this.registerUser).then(r => {
      //                 console.log('成功了')
      //             }).catch(e => {
      // 	console.log(e)
      //                 return false
      //             })
      //       } else {
      //         return false
      //       }
      //   })
    },
  },
};
</script>

<style scoped>
.login-wrapper {
  background-color: #ededed;
  display: flex;
  width: 100vw;
  height: 100vh;
  margin: auto;
}

.login-container {
  background-color: #fff;
  position: relative;
  width: 1000px;
  height: 600px;
  margin: auto;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 10px 5px #ddd;
}

.switch-wrapper {
  position: absolute;
  z-index: 99;
  left: 0;
  overflow: hidden;
  width: 32%;
  height: 100%;
  transition: transform 1s ease-in-out;
}

.switch-wrapper::after {
  content: "";
  display: block;
  background-image: url("@/assets/img/bg.png");
  background-size: 1000px 550px;
  background-position: top left;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: all 1s ease-in-out;
}

.active .switch-wrapper {
  transform: translateX(calc(1000px - 100%));
}

.active .switch-wrapper::after {
  background-position: top right;
}

.txt {
  width: 100%;
  height: 100%;
  transition: all 1s ease-in-out;
}

.top-wrapper {
  position: absolute;
  width: 260px;
  height: 168px;
  top: 50px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
}

.btn-wrapper {
  position: absolute;
  width: 100px;
  height: 36px;
  color: #fffffe;
  background-color: #6689e2;
  font-size: 15px;
  border-radius: 30px;
  cursor: pointer;
  flex-wrap: wrap;
  overflow: hidden;
}

.outerBox {
  position: absolute;
  z-index: 3;
  left: 32%;
  overflow: hidden;
  width: 68%;
  height: 100%;
  transition: all 1s ease-in-out;
}

.container {
  width: 100%;
  height: 100%;
  background-color: #fffffe;
}

.active .outerBox {
  transform: translateX(calc(-1000px + 100%));
}

.ld {
  width: 200px;
  height: 40px;
  position: absolute;
  right: 16px;
  top: 16px;
}

.title {
  font-size: 36px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 30px;
  color: #666;
}

.btn-login {
  width: 100%;
}

.row {
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}

.column {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
}

.aCenter {
  align-items: center;
}

.jCenter {
  justify-content: center;
}
</style>
