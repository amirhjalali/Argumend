# Running a real debate clip through the probe

Transcripts of broadcast clips are not stored in the repo. To reproduce `expE-clip.ts` on a clip:

1. Fetch the auto-generated captions (YouTube, no download of the video):

       python3 -m yt_dlp --js-runtimes node --skip-download --write-auto-sub --sub-lang en --sub-format vtt -o "clips/%(id)s" "https://www.youtube.com/watch?v=<id>"

   Strip timing lines and `<c>` tags, drop consecutive duplicate lines, join with spaces.

2. Diarize and extract claims with one language-model call. This is the System 2 step; Jev never sees
   raw captions. Prompt used on 2026-09-17 (Claude Sonnet via the local CLI):

   > Below is an auto-generated caption transcript (no speaker labels, unreliable punctuation) of
   > <length> <show> panel debate on <topic>, uploaded <date>. The video description reads: "<description>".
   > Speakers include <host> and the panel guests named in the description or addressed by name in the
   > transcript. Label anyone you cannot identify as Unknown.
   > Task 1: Split the transcript into speaker turns. Use only the words present; you may fix obvious
   > caption punctuation but do not paraphrase, add, or remove content. Keep every turn.
   > Task 2: List 10 to 12 atomic claims asserted by someone in the debate, each as one declarative
   > sentence, tagged with who asserted it. Include factual, definitional, and value claims, and at least
   > two claims that seem to be shared by everyone.
   > Output strictly this JSON and nothing else:
   > {"speakers":[...],"turns":[{"speaker":"...","text":"..."}],"claims":[{"id":"c1","by":"...","claim":"..."}]}

3. Run the probe against the matching Argumend map:

       bun scripts/jev-probe/expE-clip.ts <topicId> clips/<id>.diarized.json <label>

Clips used for the 2026-09-17 blog post:

| label | video | uploader | date | map |
|---|---|---|---|---|
| piers-immigration | youtube.com/watch?v=A_Lc5gixnYU (4 min, Shapiro vs Patel) | re-upload of Piers Morgan Uncensored | 2026-04-02 | immigration-national-identity |
| piers-trans-athletes | youtube.com/watch?v=zoHyLyGfKoU (36 min, Lahren, Krakue, Fiorentini, Barr) | Piers Morgan Uncensored (official) | 2024-05-23 | transgender-athletes-sports |
