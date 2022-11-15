import { Client, Events, GatewayIntentBits, VoiceBasedChannel } from "discord.js";
import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { config } from "dotenv"; config();
import csengok from './csengok.json' assert { type: "json" };
import { scheduleJob } from "node-schedule";

if (!process.env.TOKEN || !process.env.VCID) {
    console.log('no TOKEN or VCID');
    process.exit(1);
}

function playFile(vc: VoiceBasedChannel, path: string) {
    let connection = joinVoiceChannel({
        guildId: vc.guildId,
        channelId: vc.id,
        selfDeaf: false,
        selfMute: false,
        //@ts-ignore
        adapterCreator: vc.guild.voiceAdapterCreator
    });
    let player = createAudioPlayer();
    connection.subscribe(player);
    player.play(createAudioResource(path));
    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    });
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once(Events.ClientReady, async client => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    let vc = client.channels.cache.get(process.env.VCID as string);
    if (!vc || !vc.isVoiceBased()) {
        console.log("VCID isn't the id of a voice channel");
        process.exit(1);
    }

    for (let day = 1; day < 6; day++) {
        for (let i = 0; i < csengok.be.length; i++) {
            const e = csengok.be[i];
            scheduleJob({ hour: e.hour, minute: e.minute, dayOfWeek: day }, () => {
                playFile(vc as VoiceBasedChannel, 'be.mp3')
            });
        }
        for (let i = 0; i < csengok.ki.length; i++) {
            const e = csengok.ki[i];
            scheduleJob({ hour: e.hour, minute: e.minute, dayOfWeek: day }, () => {
                playFile(vc as VoiceBasedChannel, 'ki.mp3')
            });
        }
    }
});

client.login(process.env.TOKEN);
