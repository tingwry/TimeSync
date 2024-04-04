import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '@/app/theme';

export default function SetTime() {
    const [duration, setDuration] = useState(new Date(0));

    const handleTimeChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
          setDuration(selectedDate);
        }
    };
      
    return (
        <View style={styles.container}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
    },
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
});
