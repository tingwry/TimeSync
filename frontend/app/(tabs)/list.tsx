import { View, Text, StyleSheet,Image, TouchableOpacity, StatusBar  } from 'react-native'
import React from 'react'
import { router, useNavigation } from 'expo-router' 
import { Link } from 'expo-router'
import { theme } from '../theme';

export default function ListPage() {
    return (  
        // <View style={styles.background}>
        // <StatusBar barStyle="light-content" />
        // <View style={styles.containerHome}>
        //   <Text style={styles.textTitle}>Hello, User</Text>
        //   <Text style={styles.textCaption}>Let's see what is up next!</Text>
        // </View>
        <View style={styles.background}>
            <Text style={styles.more}>More</Text>
            <Text style={styles.profile}>Profile</Text>
            {/* //for prfile section */}
            <View>
            <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
      <TouchableOpacity onPress={() => router.push("/list/Account")} style={styles.btnOutline}>
          <Image source={require('@/assets/icons/user-nav.png')} style={styles.btnIcon} />
          <Text style={styles.btnText}>Account</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrow} />
        </TouchableOpacity>
        {/* <View style={{flex:1, borderBottomColor: '#fff'}} /> */}
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        <TouchableOpacity onPress={() => router.push("/list/Location")} style={styles.btnOutline}>
          <Image source={require('@/assets/icons/location.png')} style={styles.btnIcon} />
          <Text style={styles.btnText}>Locations</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrow} />
        </TouchableOpacity>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        <TouchableOpacity style={styles.btnOutline}>
          <Image source={require('@/assets/icons/preparation.png')} style={styles.btnIcon} />
          <Text style={styles.btnText}>Preparation Time</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrow} />
        </TouchableOpacity>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />

            {/* <Link style={styles.menu}
            href="/list/1">Account</Link>
            <Link href="/list/2">Locations</Link>
            <Link href="/list/3">Preparation Time</Link>
            <Link href="/list/1">Alarm</Link>
            <Link href="/list/2">Locations</Link>
            <Link href="/list/3">Preparation Time</Link> */}
        </View>
        {/* //Alarm */}
        <View>
        <View style={{ height: 6, backgroundColor: theme.colors.bluePrimary}} />
        <Text style={styles.profile}>Alarm</Text>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
      <TouchableOpacity onPress={() => router.push("/list/Alarm")} style={styles.btnOutline}>
          <Image source={require('@/assets/icons/alarm-clock.png')} style={styles.btnIcon} />
          <Text style={styles.btnText}>Alarm Setting</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrow} />
        </TouchableOpacity>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        </View>
        {/* Setting */}
        <View>
        <View style={{ height: 6, backgroundColor: theme.colors.bluePrimary}} />
        <Text style={styles.profile}>Setting</Text>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
      <TouchableOpacity onPress={() => router.push("/list/General")}style={styles.btnOutline}>
          <Image source={require('@/assets/icons/general.png')} style={styles.btnIcon} />
          <Text style={styles.btnText}>General</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrow} />
        </TouchableOpacity>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        <TouchableOpacity onPress={() => router.push("/list/Notification")}style={styles.btnOutline}>
          <Image source={require('@/assets/icons/notifications.png')} style={styles.btnIcon} />
          <Text style={styles.btnText}>Notifications</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrow} />
        </TouchableOpacity>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        </View>
        </View>
        
        
    )
} 
const styles = StyleSheet.create({
    background: {
      flex: 1,
      paddingTop: 90,
      paddingLeft: 32,
      paddingRight: 32,
      backgroundColor: theme.colors.bluePrimary,
      gap: 16,
    },
    btnOutline: {
        backgroundColor: theme.colors.bluePrimary,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 90,
        fontFamily:'dm-sans-regular'
      },
    btn: {
        backgroundColor: theme.colors.red,
        height: 48,
        width: 326,
        borderRadius: 6,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    btnText: {
        color: theme.colors.textPrimary,
        fontSize:16,
        fontFamily:'dm-sans-medium',
        right:50,
    },
    btnIcon: {
        position: 'absolute',
        left:1,
        height:20,
        width:20,
    },
    btnIconArrow: {
        position: 'absolute',
        right:1,
        height:20,
        width:20,
    },
    more: {
        color: theme.colors.textPrimary,
        fontSize: 32,
        fontFamily: "dm-sans-extrabold",
    },
    profile: {
        color: theme.colors.textPrimary,
        fontSize: 20,
        fontFamily: "dm-sans-bold",
        paddingTop: 4,
        paddingBottom:7,
    },
    alarm: {
        position:'relative',
        color: theme.colors.textPrimary,
        fontSize: 19,
        fontFamily: "dm-sans-semibold",
        top:40,
        paddingBottom:7,

    },
});
