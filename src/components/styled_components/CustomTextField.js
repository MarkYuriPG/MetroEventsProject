const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'lightgrey', // default border color
    },
    '&:hover fieldset': {
      borderColor: 'white', // border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#cb3f63', // border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: 'grey', // placeholder color
    '&.Mui-focused': {
      color: '#cb3f63', // placeholder color when focused
    },
  },
  '& .MuiInputBase-input': {
    color: 'white', // input text color
  },
  '&:-webkit-autofill': {
    backgroundColor: 'transparent !important', // Override autofill background color
    WebkitTextFillColor: 'white !important', // Override autofill text color
  },
  '&:-webkit-autofill:hover': {
    backgroundColor: 'transparent !important',
    WebkitTextFillColor: 'white !important', // Background color for autofill on hover
  },
  
};
  
export default textFieldStyles;