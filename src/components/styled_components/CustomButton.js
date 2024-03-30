const buttonStyles = {
    mt: 2,
    backgroundColor: '#cb3f63',
    color: 'white',
    '&:hover': {
        backgroundColor: '#f15478',
    },
    '&:disabled': {
        color: 'grey',
    },
};

const secondaryButtonStyles = {
    mt: 2,
    color: '#cb3f63',
    backgroundColor: 'transparent',
    borderColor: '#cb3f63',
    borderWidth: '1px',
    borderStyle: 'solid',
    '&:hover': {
        backgroundColor: 'transparent',
        borderColor: '#f15478',
    },
  };

export {buttonStyles, secondaryButtonStyles};

