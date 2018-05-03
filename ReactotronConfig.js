import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  asyncStorage,
  networking
} from 'reactotron-react-native';

Reactotron.configure({
  name: 'React Native Demo'
})
  .use(asyncStorage())
  .connect();
