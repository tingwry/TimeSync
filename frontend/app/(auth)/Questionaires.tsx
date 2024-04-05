import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../theme'

import ButtonPrimary from '@/components/buttons/ButtonPrimary'
import { Link } from 'expo-router';

import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function Questionaires() {
    const [step, setStep] = useState<number>(1);

    // set home
    const [home, setHome] = useState<string>('');

    // set time
    const [duration, setDuration] = useState(new Date(0));
    const handleTimeChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
          setDuration(selectedDate);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}>
                <Text>top</Text>
                <Text><Link href="/AllowLocation">Terms</Link></Text>
            </View>
            <View style={styles.icontab}>
                <View style={styles.icon}></View>
            </View>
            <View style={styles.content}>
                {(step === 1) ? ( <>
                    <Text style={styles.textHeader}>Set Home Location</Text>
                </> ) : (step === 2) ? ( <>
                    <Text style={styles.textHeader}>Set Morning</Text>
                    <Text style={styles.textHeader}>Preparation Time</Text>
                    <Text style={styles.textCaption}>Measure the time since you wake up until the time you have left your home.</Text>
                    
                    <TimePickerView />
                    <Text style={styles.textLink}>I'm not sure</Text>
                </> ) : (step === 3) ? ( <>
                    <Text style={styles.textHeader}>Set Default Destination</Text>
                    <Pressable onPress={() => {}}>
                        <Text>Set location</Text>
                    </Pressable>
                </> ) : (
                    <Text>Some thing went wrong</Text>
                )}
                    
            </View>
            <View style={styles.bottom}>
                <Text>Progress bar</Text>
                <ButtonPrimary text='Continue' press={() => {}} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: theme.colors.bluePrimary,
        height: '100%',
    },
    top :{
        backgroundColor: theme.colors.red,
        flex: 1,
    },
    icontab: {
        flex: 6,
        justifyContent: 'flex-end',
        width: '100%',
        alignItems: 'center',
    },
    icon: {
        backgroundColor: theme.colors.textPlaceholder,
        width: 128,
        height: 128,
        borderRadius: 64,
        marginBottom: 24,
    },
    content: {
        flex: 14,
        width: '100%',
        alignItems: 'center',
    },
    bottom: {
        flex: 3,
        backgroundColor: theme.colors.green,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    // content
    textHeader: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-semibold",
        fontSize: 28,
    },
    textCaption: {
        color: theme.colors.textCaption,
        fontFamily: "dm-sans-regular",
        fontSize: 16,

        width: '80%',
        marginTop: 24,
        textAlign: 'center',
    },
    textLink: {
        color: theme.colors.textPrimary,
        fontFamily: "dm-sans-semibold",
        fontSize: 16,
    },    
})

const TimePickerView = () => {
    const [duration, setDuration] = useState({hours: 0, minutes: 0, seconds: 0});
    return (
        <View
            style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 32,
            marginBottom: 24,
            }}
        >
            <TimerPicker
                onDurationChange={(pickedDuration) => (console.log(pickedDuration), setDuration(pickedDuration))}
                hourLabel="hours"
                minuteLabel="mins"
                // hideHours
                hideSeconds={true}
                LinearGradient={LinearGradient}
                styles={{
                    backgroundColor: theme.colors.bluePrimary,
                    pickerItem: {
                        fontSize: 40,
                        color: theme.colors.textPrimary,
                        fontFamily: "dm-sans-medium",
                    },
                    pickerLabel: {
                        fontSize: 24,
                        // marginTop: 0,
                        color: theme.colors.textPrimary,
                        fontFamily: "dm-sans-medium",
                    },
                    // pickerContainer: {
                    //     marginRight: 0,
                    // },
                    pickerItemContainer: {
                        // marginHorizontal: -16,
                    },
                    pickerLabelContainer: {
                        right: -44,
                        top: 0,
                        bottom: 6,
                        width: 80,
                        // alignItems: "center",
                    },
                }}
            />
        </View>
    );
};
  