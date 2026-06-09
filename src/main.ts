import './style.scss'
import { AutoplayVideoHeader } from './components/AutoplayVideoHeader';


// Setup header hero video
const heroVideo = new AutoplayVideoHeader({
  videoSelector: '#closVideo',
  buttonSelector: '#videoControl',
  playIconSelector: '#playIcon',
  pauseIconSelector: '#pauseIcon'
});