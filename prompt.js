export const generateTagsPrompt = (existingTags = null) => {
  let prompt = `
You are an expert mapper for Open Street Maps. You follow all OSM conventions and best practices. Analyze this image and generate valid OpenStreetMap (OSM) tags for the organization.

# Focus On:
1. **Primary Business:** Identify the most specific 'shop' tag.
2. **Address:** Extract 'addr:street' and 'addr:housenumber'.
3. **Opening Hours:** Extract 'opening_hours'.

# Guidelines
- Only add tags that are commonly used by the OSM community.
- Provide reasoning for ALL of the chosen tags.
- Only add tags in languages visible in the image.
- Combine all values for the same key into a single tag separated by semicolons.
- For shop= use only the most specific shop type.
- If you are unsure about a tag value, provide your best guess and add a comment explaining your reasoning.
- Provide tags in the format below.
- Keep the order of tags the same
- Keep the check_date field the same

# Example
name=Example Cafe
amenity=cafe
addr:street=Main Street
addr:housenumber=123
opening_hours=Mo-Fr 08:00-18:00; Sa 10:00-16:00
contact:instagram=https://instagram.com/cafe
phone=+44 20 8452 7891
website=https://cafe.com



The image may not contain all the necessary information. Assume the image was taken from the street level.
`;

  if (existingTags) {
    prompt += `

# Existing Tags
The following tags already exist for this location. Please update them based on the new image data:
${existingTags}

When updating, keep any existing tags that are still valid and add new tags based on the image. If any existing tags are no longer valid, remove them and explain why.
`;
  }
  console.log("prompt", prompt);
  return prompt;
};