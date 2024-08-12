import useSound from "use-sound";
import ahSound from "../assets/sounds/ah.mp3";
import correctSound from "../assets/sounds/correct.mp3";
import finishSound from "../assets/sounds/finish.mp3";
import firstSound from "../assets/sounds/first.mp3";
import haSound from "../assets/sounds/ha.mp3";
import introSound from "../assets/sounds/intro.mp3";
import nextSound from "../assets/sounds/next.mp3";
import okSound from "../assets/sounds/ok.mp3";
import timeUpSound from "../assets/sounds/timeup.mp3";
import wrongSound from "../assets/sounds/wrong.mp3";
import yeahSound from "../assets/sounds/yeah.mp3";

const useQuizSounds = () => {
	const [correctSoundPlay] = useSound(correctSound);
	const [wrongSoundPlay] = useSound(wrongSound);
	const [ahSoundPlay] = useSound(ahSound);
	const [yeahSoundPlay] = useSound(yeahSound);
	const [firstSoundPlay] = useSound(firstSound);
	const [nextSoundPlay] = useSound(nextSound);
	const [introSoundPlay] = useSound(introSound);
	const [okSoundPlay] = useSound(okSound);
	const [finishSoundPlay] = useSound(finishSound);
	const [timeUpSoundPlay] = useSound(timeUpSound);
	const [haSoundPlay] = useSound(haSound);

	return {
		correctSoundPlay,
		wrongSoundPlay,
		ahSoundPlay,
		yeahSoundPlay,
		firstSoundPlay,
		nextSoundPlay,
		introSoundPlay,
		okSoundPlay,
		finishSoundPlay,
		timeUpSoundPlay,
		haSoundPlay,
	};
};

export default useQuizSounds;
