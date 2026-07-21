import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Video, { ReactVideoSource, VideoRef } from 'react-native-video';

interface Episode {
  id: string;
  title: string;
  duration: string;
  uri: string;
}

const EPISODES: Episode[] = [
  {
    id: '1',
    title: 'Ep 1: Big Buck Bunny',
    duration: '9m 56s',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '2',
    title: 'Ep 2: Elephant Dream',
    duration: '10m 53s',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: '3',
    title: 'Ep 3: For Bigger Blazes',
    duration: '15s',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
];

export default function App() {
  const videoRef = useRef<VideoRef>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(EPISODES[0]);
  const [isLoading, setIsLoading] = useState(true);

  const videoSource: ReactVideoSource = {
    uri: currentEpisode.uri,
  };

  const handleSelectEpisode = (ep: Episode) => {
    if (ep.id !== currentEpisode.id) {
      setIsLoading(true);
      setCurrentEpisode(ep);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
cat << 'EOF' > App.tsx
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Video, { ReactVideoSource, VideoRef } from 'react-native-video';

interface Episode {
  id: string;
  title: string;
  duration: string;
  uri: string;
}

const EPISODES: Episode[] = [
  {
    id: '1',
    title: 'Ep 1: Big Buck Bunny',
    duration: '9m 56s',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: '2',
    title: 'Ep 2: Elephant Dream',
    duration: '10m 53s',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: '3',
    title: 'Ep 3: For Bigger Blazes',
    duration: '15s',
    uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
];

export default function App() {
  const videoRef = useRef<VideoRef>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>(EPISODES[0]);
  const [isLoading, setIsLoading] = useState(true);

  const videoSource: ReactVideoSource = {
    uri: currentEpisode.uri,
  };

  const handleSelectEpisode = (ep: Episode) => {
    if (ep.id !== currentEpisode.id) {
      setIsLoading(true);
      setCurrentEpisode(ep);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MovieWorld Fresh</Text>
        <Text style={styles.nowPlaying}>Playing: {currentEpisode.title}</Text>
      </View>

      {/* Video Player */}
      <View style={styles.videoContainer}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#FFFFFF"
            style={StyleSheet.absoluteFillObject}
          />
        )}
        <Video
          ref={videoRef}
          source={videoSource}
          style={styles.video}
          controls={true}
          resizeMode="contain"
          onLoad={() => setIsLoading(false)}
          onError={(e) => console.log('Video error:', e)}
        />
      </View>

      {/* Episode Selection Slider */}
      <View style={styles.episodesSection}>
        <Text style={styles.sectionTitle}>Select Episode</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.episodeList}
        >
          {EPISODES.map((ep, index) => {
            const isSelected = ep.id === currentEpisode.id;

            return (
              <Pressable
                key={ep.id}
                hasTVPreferredFocus={index === 0}
                onPress={() => handleSelectEpisode(ep)}
                style={({ focused }) => [
                  styles.episodeCard,
                  // Active state or TV Remote D-Pad focus triggers thick 4px white border
                  (isSelected || focused) && styles.episodeCardFocused,
                ]}
              >
                {({ focused }) => (
                  <>
                    <Text
                      style={[
                        styles.episodeTitle,
                        (isSelected || focused) && styles.textHighlight,
                      ]}
                    >
                      {ep.title}
                    </Text>
                    <Text style={styles.episodeDuration}>{ep.duration}</Text>
                    {isSelected && <Text style={styles.playingTag}>▶ NOW PLAYING</Text>}
                  </>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E50914',
  },
  nowPlaying: {
    fontSize: 14,
    color: '#CCC',
    marginTop: 4,
  },
  videoContainer: {
    width: '100%',
    height: Platform.isTV ? 380 : 220,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  episodesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
  },
  episodeList: {
    gap: 12,
  },
  episodeCard: {
    backgroundColor: '#1E1E1E',
    padding: 14,
    borderRadius: 8,
    width: 180,
    borderWidth: 4,
    borderColor: 'transparent', // Hidden border when not focused/selected
  },
  episodeCardFocused: {
    borderColor: '#FFFFFF', // 4px thick white border on selection or D-Pad focus
    backgroundColor: '#2A2A2A',
    transform: [{ scale: 1.05 }], // Slight lift/pop effect
  },
  episodeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DDD',
  },
  textHighlight: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  episodeDuration: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  playingTag: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E50914',
    marginTop: 8,
  },
});
