import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { theme } from "../theme";
import { Link, router, useLocalSearchParams } from "expo-router";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/authContext";

export default function Terms() {
  const [loading, isLoading] = useState(false);
  const { email, password, username, name, phoneNumber } = useLocalSearchParams<{ email: string, password: string, username: string, name: string, phoneNumber: string }>();
  const [agree, setAgree] = useState(true);
  const auth = useAuth();
  
  const submit = async () => {
    if (agree) {
        isLoading(true);
        const baseUrl = process.env.BASE_URL;
        const response = await fetch(`${baseUrl}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "email": email, 
                "password": password,
                "username": username, 
                "name": name, 
                "phone_number": phoneNumber 
            }),
        });

        isLoading(false);
        if (response.ok) {
          await auth.signIn(email, password);
            router.replace({ 
                pathname: '/AllowLocation',
            });
        } else {
            const errorData = await response.json();
            console.log('Something went wrong')
            console.log(errorData)
          }
      } else {
        console.log('Please agree to the terms and conditions')
      }
    } 

  return (
    <LinearGradient colors={["#182640", "#263D66"]} style={{paddingHorizontal: 32}}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.textHeader}>Terms & Conditions</Text>

        <ScrollView style={styles.contentView}>
          <Text>{terms2}</Text>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.checkLine}>
            <Pressable 
              style={[styles.checkbox, { backgroundColor: agree ? theme.colors.textPrimary : 'transparent' }]}
              onPress={() => setAgree(!agree)}
            />
            <Text style={styles.checkText}>
              I agree to TimeSync Terms & Conditions.
            </Text>
          </View>

          <ButtonPrimary text="Create account" press={submit} />
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    flexGrow: 1,
  },
  textHeader: {
    color: theme.colors.textPrimary,
    fontFamily: "dm-sans-bold",
    fontSize: 24,
    marginTop: 32,
    marginBottom: 16,
  },
  contentView: {
    width: "100%",
    marginBottom: 16,
  },
  agreementTopic: {
    fontFamily: "dm-sans-bold",
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  agreementSubTopic: {
    fontFamily: "dm-sans-semibold",
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  agreementParagraph: {
    fontFamily: "dm-sans-regular",
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  agreementEmail: {
    fontFamily: "dm-sans-regular",
    fontSize: 14,
    color: theme.colors.orangePrimary,
    marginBottom: 8,
  },
  footer: {
    // flex: 1,
    // justifyContent: "flex-end",
  },
  checkLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    backgroundColor: theme.colors.green,
  },
  checkText: {
    color: theme.colors.textPrimary, 
    fontFamily: "dm-sans-regular",
    fontSize: 14, 
    marginLeft: 16
  }
});

const effective = `Effective Date: 15 April 2024`;
const welcome = `        Welcome to TimeSync! These Terms & Conditions ("Terms") govern your access and utilization of our mobile application, TimeSync (the "App"). By utilizing the App, you signify your agreement to be bound by these Terms. If you disagree with any portion of these Terms, please refrain from using the App.`;

const h1 = `1. TimeSync Services`;
const sh1 = ``;
const t1 = `        TimeSync is an alarm and countdown timer application that furnishes personalized departure time recommendations to facilitate your timely arrival at designated destinations. The App personalizes your departure time by considering the following elements:`;
const l1_1 = `- Location: We utilize your current and destination location information (encompassing address, zip code, or geographical coordinates) to calculate travel distance and estimate travel time, leveraging a combination of mapping services and historical traffic data.`;
const l1_2 = `- User Behavior: Over time, the App accumulates knowledge of your travel preferences and routines (e.g., typical commute times, preferred routes) to refine departure time suggestions. This data is anonymized and not directly linked to your personally identifiable information.`;
const l1_3 = `- Traffic Conditions (when available): Traffic data from third-party traffic providers is integrated within the App (subject to availability in your region) to optimize your departure time and propose alternative routes to circumvent congestion.`;

const h2 = `2. Data Collection & Usage`;
const sh2_1 = `        2.1 Information We Collect`;

const tsh2_1 = `        To deliver the personalized functionalities of TimeSync, we collect the following data:`;
const l2_1_1 = `- Location Data: Your home location and destination addresses (including city, state, and zip code) or geographical coordinates. You have the option to save frequently used destinations for easier access.`;
const l2_1_2 = `- User Behavior Data: Aggregated and anonymized data regarding your interaction with the App, including travel times and routes. This data excludes personally identifiable information.`;
const l2_1_3 = `- Device Data: Device type, operating system, and a unique device identifier used for app functionality (not for user identification).`;

const sh2_2 = `        2.2 How We Use Your Data`;
const tsh2_2 = `        The data we collect is utilized for the following purposes:`;
const l2_2_1 = `- To personalize departure time suggestions based on your unique travel patterns, preferences, and historical data.`;
const l2_2_2 = `- To enhance the precision of travel time estimates by factoring in traffic conditions.`;
const l2_2_3 = `- To develop and improve the App's features and functionality, such as proposing alternative routes or optimizing battery usage.`;
const l2_2_4 = `- To furnish you with relevant information and offers pertaining to TimeSync features or partnerships (with your consent). You can opt-out of receiving these communications at any time within the App settings.`;

const sh2_3 = `        2.3 Data Privacy`;
const tsh2_3_1 = `        We are steadfastly committed to safeguarding your privacy. We will never share your personal information with third parties without your explicit consent. We implement industry-standard security measures, including encryption and access controls, to protect your data from unauthorized access, disclosure, alteration, or destruction.`;
const tsh2_3_2 = `        For more granular details on our data privacy practices, please refer to our separate Privacy Policy available within the App.`;

const h3 = `3. Location Access`;
const t3 = `        TimeSync necessitates access to your location data to function effectively. This grants the App the ability to determine your home location, calculate travel distances, and recommend optimal departure times. You can manage location access permissions within your device settings. Please be advised that disabling location access will significantly restrict the App's functionality.`;

const h4 = `4. Disclaimer`;
const t4 = `        TimeSync's departure time suggestions are grounded in estimations and should not be regarded as absolute. It is highly recommended to always incorporate additional buffer time for unforeseen circumstances such as car trouble, unexpected delays, or finding parking. TimeSync is not a substitute for safe driving practices. It is your responsibility to maintain awareness of your surroundings, adhere to traffic laws, and adjust your driving behavior accordingly.`;

const h5 = `5. User Responsibilities`;
const t5 = `        By utilizing TimeSync, you agree to:`;
const l5_1 = `- Furnish accurate location data for your home and destinations.`;
const l5_2 = `- Review and update your preferences within the App settings, such as preferred travel modes (car, motorcycle, bus, metro, walking) and buffer time settings.`;
const l5_3 = `- Maintain awareness of your surroundings and drive responsibly. Pay close attention to road conditions, traffic signals, and weather while using the App.`;
const l5_4 = `- Comply with all applicable laws and regulations regarding mobile phone use while driving.`;

const h6 = `6. Termination of Services`;
const t6 = `        We reserve the right to terminate or suspend your access to the App if you violate these Terms, engage in any conduct that may harm us or other users, or if we are required to do so by law.`;

const h7 = `7. Changes to Terms & Conditions`;
const t7 = `        We may update these Terms & Conditions periodically to reflect changes in our practices or applicable laws. We will make reasonable efforts to notify you of any material changes to the Terms & Conditions through the App or by email (if you have provided your email address).  Your continued use of the App following the posting of revised Terms & Conditions constitutes your acceptance of the revised terms. We recommend that you review the Terms & Conditions periodically for any updates.`;

const h8 = `8. Contact Information`;
const t8_1 = `If you have any questions or concerns about these Terms & Conditions, or if you need assistance with the App, please don't hesitate to contact us at:`;
const t8_email = `support@timesync.com`;
const t8_2 = `We value your feedback and will do our best to address your inquiries promptly.`;

const terms2 = (
  <View style={{flex: 1}}>
    <Text style={styles.agreementTopic}>{effective}</Text>
    <Text style={styles.agreementParagraph}>{welcome}</Text>

    <Text style={styles.agreementTopic}>{h1}</Text>
    <Text style={styles.agreementParagraph}>{t1}</Text>


    <Text style={styles.agreementTopic}>{h2}</Text>
    <Text style={styles.agreementSubTopic}>{sh2_1}</Text>
    <Text style={styles.agreementParagraph}>{tsh2_1}</Text>
    <Text style={styles.agreementParagraph}>{l2_1_1}</Text>
    <Text style={styles.agreementParagraph}>{l2_1_2}</Text>
    <Text style={styles.agreementParagraph}>{l2_1_3}</Text>

    <Text style={styles.agreementSubTopic}>{sh2_2}</Text>
    <Text style={styles.agreementParagraph}>{tsh2_2}</Text>
    <Text style={styles.agreementParagraph}>{l2_2_1}</Text>
    <Text style={styles.agreementParagraph}>{l2_2_2}</Text>
    <Text style={styles.agreementParagraph}>{l2_2_3}</Text>
    <Text style={styles.agreementParagraph}>{l2_2_4}</Text>

    <Text style={styles.agreementSubTopic}>{sh2_3}</Text>
    <Text style={styles.agreementParagraph}>{tsh2_3_1}</Text>
    <Text style={styles.agreementParagraph}>{tsh2_3_2}</Text>
    
    <Text style={styles.agreementTopic}>{h3}</Text>
    <Text style={styles.agreementParagraph}>{t3}</Text>

    <Text style={styles.agreementTopic}>{h4}</Text>
    <Text style={styles.agreementParagraph}>{t4}</Text>

    <Text style={styles.agreementTopic}>{h5}</Text>
    <Text style={styles.agreementParagraph}>{t5}</Text>
    <Text style={styles.agreementParagraph}>{l5_1}</Text>
    <Text style={styles.agreementParagraph}>{l5_2}</Text>
    <Text style={styles.agreementParagraph}>{l5_3}</Text>
    <Text style={styles.agreementParagraph}>{l5_4}</Text>

    <Text style={styles.agreementTopic}>{h6}</Text>
    <Text style={styles.agreementParagraph}>{t6}</Text>

    <Text style={styles.agreementTopic}>{h7}</Text>
    <Text style={styles.agreementParagraph}>{t7}</Text>

    <Text style={styles.agreementTopic}>{h8}</Text>
    <Text style={styles.agreementParagraph}>{t8_1}</Text>
    <Text style={[styles.agreementEmail]}>{t8_email}</Text>
    <Text style={styles.agreementParagraph}>{t8_2}</Text>
  </View>
)