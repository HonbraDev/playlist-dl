# playlist-dl
Batch YouTube Playlist Downloader in node.js

## Setup

### Download node.js

You can download node.js from [nodejs.org](https://nodejs.org/en/) (select LTS)

#### How to tell if you have node.js

Open terminal (or your OS' counterpart) and type this command:

    node -v

If you have node.js this command will show you its version.

### Install modules

Open terminal (or your OS' counterpart), navigate to where you downloaded youtube-downloader and type this command:

    npm install

## API key

I have included an API key, but please use your own. The API key is stored in ```config.json```

## Downloading videos

### Step 1

Paste the playlist ID into ```config.json```.

### Step 2

Open terminal (or your OS' counterpart), navigate to where you downloaded youtube-downloader and type this command:

    npm start

The downloaded videos will be in ```videos/```

## Further configuration

Options are located in ```config.json```.
