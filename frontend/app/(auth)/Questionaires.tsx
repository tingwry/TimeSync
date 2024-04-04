import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../theme'

import ButtonPrimary from '@/components/buttons/ButtonPrimary'

import SetTime from './SetTime'
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Questionaires() {
    const [step, setStep] = useState<number>(3);

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
                    <DateTimePicker
                        // testID={'dateTimePicker'}
                        value={duration}
                        mode="countdown"
                        display="spinner"
                        onChange={handleTimeChange}
                        textColor={theme.colors.textPrimary}
                        // style={styles.duration}
                    />
                    <Text style={styles.textLink}>I'm not sure</Text>
                </> ) : (step === 3) ? ( <>
                    <Text style={styles.textHeader}>Set Default Destination</Text>
                </> ) : (
                    <Text>Some thing went wrong</Text>
                )}
                    
            </View>
            <View style={styles.bottom}>
                <Text>Progress bar</Text>
                <ButtonPrimary text='Continue' onPress={() => {}} />
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
        flex: 5,
        justifyContent: 'flex-end',
        backgroundColor: theme.colors.stroke,
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
        flex: 11,
        width: '100%',
        alignItems: 'center',
    },
    bottom: {
        flex: 3,
        backgroundColor: theme.colors.green,
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
    }
})