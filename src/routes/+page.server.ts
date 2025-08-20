import { LASTFM_APIKEY } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	// get the currently playing track info
	// via last.fm (spotify and soundcloud)
	try {
		const response = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=mielsense&api_key=${LASTFM_APIKEY}&format=json&limit=1`
		);

		const data = await response.json();
		if (!response.ok) {
			throw new Error(`${response.status} - ${data.message}`);
		}

		if (data.recenttracks && data.recenttracks.track && data.recenttracks.track.length > 0) {
			const track = data.recenttracks.track[0];
			if (track['@attr'] && track['@attr'].nowplaying) {
				return { track: track };
			} else {
				return { track: null };
			}
		}

		return {};
	} catch (error) {
		console.error(error);
		return { track: null };
	}
};
