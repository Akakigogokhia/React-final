const AuthService = {
  validate: ({ username, email, password, confirmPassword }, isLogin) => {
    const newErrors = {};
    if (!isLogin) {
      if (!username.trim()) {
        newErrors.username = 'შეიყვანე მომხმარებლის სახელი';
      } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        newErrors.username =
          'მომხმარებლის სახელი არ უნდა შეიცავდეს სპეციალურ სიმბოლოებს გარდა ტირის და ქვედატირის';
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'პაროლები არ ემთხვევა';
      }
    }
    if (!email) {
      newErrors.email = 'შეიყვანე ელ.ფოსტა';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'ელ.ფოსტა არასწორია';
    }
    if (!password) {
      newErrors.password = 'შეიყვანე პაროლი';
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password)
    ) {
      newErrors.password =
        'პაროლი უნდა შეიცავდეს დიდ სიმბოლოს, ციფრს და სპეციალურ სიმბოლოს';
    } else if (password.length < 6) {
      newErrors.password = 'პაროლის სიგრძე უნდა აღემატებოდეს 6-ს';
    }

    return newErrors;
  },
};

export default AuthService;
