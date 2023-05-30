import React, { useState } from "react";
import FestivalMap from "@/components/festivalMap";
import { ScheduleCardMID } from "@/components/Mid_modal";
import { ScheduleCardJOTU } from "@/components/Jotu_modal";
import { ScheduleCardVAN } from "@/components/Van_modal";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function FestivalPage({ scheduleData }) {
  return (
    <>
      <FestivalMap scheduleData={scheduleData} />
    </>
  );
}

export async function getServerSideProps() {
  // const apiEndpoints = [
  //   "http://localhost:8080/bands",
  //   "http://localhost:8080/schedule",
  //   "http://localhost:8080/available-spots",
  // ];
  const apiEndpoints = [
    "https://nova-enchanted-confidence.glitch.me/bands",
    "https://nova-enchanted-confidence.glitch.me/schedule",
    "https://nova-enchanted-confidence.glitch.me/available-spots",
  ];

  // mapper igennem hver array alt efter hvilket endpoint det er og fetcher
  const apiRequest = apiEndpoints.map((endpoint) => fetch(endpoint));
  // Promise.all venter på alle apiRequest er kørt igennem før den går videre.
  const [bandRes, scheduleRes, spotRes] = await Promise.all(apiRequest);

  const bandData = await bandRes.json();
  const scheduleData = await scheduleRes.json();
  const spotData = await spotRes.json();

  return {
    props: {
      bandData,
      scheduleData,
      spotData,
    },
  };
}
