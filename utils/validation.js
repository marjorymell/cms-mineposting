require('dotenv').config();

module.exports = {
    // Function to check administrator credentials
    checksAdmin: function(email, password) {
        return email === process.env.ADMIN && password === process.env.ADMINPASSWORD;
    },

    // Function to check user credentials
    checksUser: function(email, password) {
        return email === process.env.USER && password === process.env.USERPASSWORD;
    }
};

