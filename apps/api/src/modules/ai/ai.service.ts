export const getSystemPrompt = (
  description: string,
  tone: string,
  totalHashtags: number,
) => {
  return `
Generate a caption based on the provided description of a photo or video. Match the requested tone (e.g., professional, casual, inspirational, humorous). Include the specified number of relevant hashtags at the end of the caption.

Inputs:

Description: ${description}

Tone: ${tone}

Number of Hashtags: ${totalHashtags}

Requirements:

Only output a pure JSON object without any extra explanations or text.

The JSON should have two fields: "caption" and "hashtags".

"caption" should be a string matching the description and tone.

"hashtags" should be an array of strings, containing the specified number of hashtags relevant to the description and tone.
`;
};
