<template>
    <main class="bg_gray">	
		<div class="container margin_30">
			<div class="page_header">
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link></li>
						<li>Account</li>
					</ul>
				</div>
				<h1>Account</h1>
			</div>
			<div class="row justify-content-center">
				<div class="col-xl-6 col-lg-6 col-md-8">
					<div class="box_account">
						<h3 class="client">{{ title }}</h3>
						<form class="form_container" @submit.prevent="submitForm">
							<div v-if="signup">
								<div :class="['form-group', errors.first_name ? 'danger' : '']">
									<label>First Name</label>
									<input type="text" class="form-control" placeholder="Jhon" v-model="form.first_name" />
                                    <small class="form-text text-danger" v-if="errors.first_name">{{ errors.first_name[0] }}</small>
								</div>
								<div :class="['form-group', errors.last_name ? 'danger' : '']">
									<label>Last Name</label>
									<input type="text" class="form-control" placeholder="Deo" v-model="form.last_name" />
                                    <small class="form-text text-danger" v-if="errors.last_name">{{ errors.last_name[0] }}</small>
								</div>
								<div :class="['form-group', errors.username ? 'danger' : '']">
									<label>Username</label>
									<input type="text" class="form-control" placeholder="jhon" v-model="form.username" />
                                    <small class="form-text text-danger" v-if="errors.username">{{ errors.username[0] }}</small>
								</div>
							</div>
							<div :class="['form-group', errors.email ? 'danger' : '']">
								<label>Email</label>
								<input type="email" class="form-control" placeholder="email@example.com" v-model="form.email" />
                                <small class="form-text text-danger" v-if="errors.email">{{ errors.email[0] }}</small>
							</div>
							<div :class="['form-group', errors.password ? 'danger' : '']" v-if="signup || login">
								<label>Password</label>
								<input type="password" class="form-control" placeholder="*******" v-model="form.password" />
                                <small class="form-text text-danger" v-if="errors.password">{{ errors.password[0] }}</small>
							</div>
							<div :class="['form-group', errors.password ? 'danger' : '']" v-if="signup">
								<label>Confirm Password</label>
								<input type="password" class="form-control" placeholder="*******" v-model="form.password_confirmation" />
							</div>
							<div class="clearfix add_bottom_15">
								<div class="checkboxes float-left" v-if="signup || login">
									<label class="container_check">Remember me
										<input type="checkbox" />
										<span class="checkmark"></span>
									</label>
								</div>
								<div class="float-right" v-if="login">
                                    <button type="button" @click="lostPassword" class="btn_1 btn-text">Lost Password?</button>
                                </div>
                                <div class="float-right" v-else-if="forgetPassword">
                                    <button type="button" @click="activeLogin" class="btn_1 btn-text">Login</button>
                                </div>
							</div>
							<div class="text-center">
                                <button type="submit" class="btn_1 full-width">{{ title }}</button>
                                <br>
								<div v-if="login">
									Don't have an account?
									<button type="button" @click='activeSignup' class='btn_1 btn-text'>Sign Up</button>
								</div>
								<div v-else-if="signup">
									Already have an account
									<button type="button" @click='activeLogin' class='btn_1 btn-text'>Login</button>
								</div>
								<div v-else-if="forgetPassword">
									You will received reset password email shortly, if found your email.
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
export default {
    data() {
        return {
			login: true,
			forgetPassword: false,
			signup: false,
			title: "Login",
			form: {
				first_name: null,
				last_name: null,
				email: 'admin@dede.com',
				username: null,
				password: 'password',
				password_confirmation: null
            },
            errors: []
        }
	},
	methods: {
		activeSignup() {
            this.errors = [];
            this.signup = true;
            this.login = false;
            this.forgetPassword = false;
            this.title = "Register";
		},
		activeLogin() {
            this.errors = [];
            this.login = true;
            this.signup = false;
            this.forgetPassword = false;
            this.title = "Login";
		},
		lostPassword() {
            this.errors = [];
            this.forgetPassword = true;
            this.login = false;
            this.signup = false;
            this.title = "Reset Password";
        },
        submitForm() {
            this.errors = [];
            if (this.login) {
                this.userLogin({
                    'email': this.form.email,
                    'password': this.form.password
                });
            } else if (this.signup) {
                this.userRegister(this.form);
            } else {
                console.log("Reset Password will setup later");
            }
        },
        userLogin(data) {
            axios.post('auth/login', data)
            .then(res => {
                User.responseAfterLogin(res);
                console.log("Redirect");
            })
            .catch(err => this.errors = err.response.data.errors);
        },
        userRegister(data) {
            axios.post('auth/signup', data)
            .then(res => console.log(res))
            .catch(err => this.errors = err.response.data.errors);
        }
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/front/account.css';
.text-danger {
    color: #CA0B00;
}
.danger input {
    border-color: #CA0B00;
}
</style>
