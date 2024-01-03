<script lang="ts">
  import {
    Html,
    Head,
    Section,
    Container,
    Text,
    Button,
    Heading,
    Img,
    Body,
    Column,
  } from "svelte-email";

  const mainStyle = {
    backgroundColor: "rgb(236, 240, 241)",
  };

  const containerStyle = {
    backgroundColor: "rgb(255, 255, 255)",
    padding: "20px 48px",
    width: "375px",
    margin: "0 auto",
  };

  const roundedImage = {
    borderRadius: "100px",
  };
</script>

<Html lang="en">
  <Head />
  <Section style={mainStyle}>
    <div>
      <Section>
        <Column style={containerStyle}>
          <div>
            <Img
              src="https://e2e2.qa.dubclub.win//static/images/logo.2ce7e00ba5bc.png"
              width="135"
              height="35"
              alt="DubClub logo"
            />
            <Heading>Started to sign up but fumbled?</Heading>
          </div>
        </Column>
      </Section>
      <Section>
        <Column style={containerStyle}>
          <div>
            <Img
              src="https://pbs.twimg.com/profile_images/1217335776930779138/wpSCNwyY_400x400.jpg"
              width="100"
              height="100"
              alt="Capper"
              style={roundedImage}
            />
            <Text>
              No worries! Click below to start winning more with StanfordWalkers
            </Text>
          </div>
        </Column>
      </Section>
    </div>
  </Section>
</Html>
