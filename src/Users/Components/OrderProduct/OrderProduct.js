import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReviewItems from './ReviewItems/ReviewItems';
import AddAddress from './AddAddress/AddAddress';
import SelectPaymnent from './SelectPayment/SelectPaymnent';
import { Link } from 'react-router-dom';
import StepConnector from '@material-ui/core/StepConnector';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

function getSteps() {
  return ['Select Address', 'Review Product', 'Select Payment Method'];
}

function getStepContent(stepIndex, activeStep, width) {
  switch (stepIndex) {
    case 0:
        return (<AddAddress Step={activeStep} width={width}/>);
    case 1:
      return (<ReviewItems Step={activeStep} width={width}/>);
    case 2:
      return (<SelectPaymnent />);
    default:
      return 'Unknown stepIndex';
  }
}


export default function HorizontalLabelPositionBelowStepper({width}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


  return (
    <div className={classes.root}>

      <Stepper activeStep={activeStep}  connector={<ColorlibConnector />} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {
          <div>
            <div>
              <Button variant="contained" color="primary"
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Go to Previous Step
              </Button>
              
              <Link to="/checkout">
              <Button variant="contained" color="primary">Go to CHeckout</Button>
              </Link>
            </div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, handleNext, width)}</Typography>
          </div>
        }
      </div>
      
    </div>
  );
}