const { videos_path, key, id, debug } = require("./config.json"),
    fetch = require("node-fetch"),
    ytdl = require("ytdl-core"),
    ffmpeg = require("fluent-ffmpeg"),
    readline = require('readline'),
    url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${key}`;

let output,
    ids = [];

(async() => {
    console.log("\n" + "Finding videos");

    output = await fetch(url).then(res => res.json());
    if (debug) console.log(output);
    pushOutput(output);

    while (output.nextPageToken) {
        output = await fetch(url + `&pageToken=${output.nextPageToken}`).then(res =>
            res.json()
        );
        if (debug) console.log(output);
        pushOutput(output);
    }

    if (debug) console.log(ids);
    console.log(`Found ${ids.length} videos`);

    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];

        var info = await ytdl.getBasicInfo(ids[i]);

        var stream = ytdl(id, {
            quality: 'highestaudio',
        });

        stream.on("error", e => {
            console.log(e);
        });

        await new Promise(resolve => {
            process.stdout.write("\n" + `[ ] [${i + 1} / ${ids.length}] ${info.videoDetails.title}`);
            ffmpeg(stream)
                .audioBitrate(128)
                .save(`${videos_path}/${info.videoDetails.title}.mp3`)
                .on("end", () => {
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(`[✔️] [${i + 1} / ${ids.length}] ${info.videoDetails.title}`);
                    resolve();
                })
                .on("error", e => {
                    console.log("\n\n" + e);
                    resolve();
                });
        });
    }
    console.log(`Downloaded ${ids.length} videos`);
})();

function pushOutput(output) {
    output.items.forEach(item => {
        ids.push(item.snippet.resourceId.videoId);
    });
}