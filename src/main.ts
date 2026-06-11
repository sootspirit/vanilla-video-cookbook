import './style.scss'
import { AutoplayVideoHeader } from './components/AutoplayVideoHeader';


// Setup header hero video
new AutoplayVideoHeader({
  videoSelector: '#closVideo',
  buttonSelector: '#videoControl',
  playIconSelector: '#playIcon',
  pauseIconSelector: '#pauseIcon'
});