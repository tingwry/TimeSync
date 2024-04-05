import { View, Text, StyleSheet,Image, TouchableOpacity, StatusBar, Button  } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { theme } from '../theme';
import { router } from 'expo-router';

export default function AccountPage() {
    return (  
        // <View style={styles.background}>
        // <StatusBar barStyle="light-content" />
        // <View style={styles.containerHome}>
        //   <Text style={styles.textTitle}>Hello, User</Text>
        //   <Text style={styles.textCaption}>Let's see what is up next!</Text>
        // </View>
        <View style={styles.background}>
           <TouchableOpacity onPress={() => router.push("(more)")} style={styles.btnOutline}>
          <Image source={require('@/assets/icons/chevron-left.png')} style={styles.btnIconArrowLeft} />
          <Text style={styles.smallmore}>More</Text>
        </TouchableOpacity>
            <Text style={styles.more}>Account</Text>
            {/* //for prfile section */}
            <View>
        {/* <Text style={styles.btnText}>Account</Text> */}

        <View style={styles.btnOutline}>
          <Text style={styles.btnText}>Name</Text>
        </View>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        <View style={styles.btnOutline}>
          <Text style={styles.btnText}>Username</Text>
        </View>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        <View style={styles.btnOutline}>
          <Text style={styles.btnText}>Phone</Text>
        </View>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        <View style={styles.btnOutline}>
          <Text style={styles.btnText}>View</Text>
        </View>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.btnText}>Reset Password</Text>
          <Image source={require('@/assets/icons/chevron-right.png')} style={styles.btnIconArrow} />
        </TouchableOpacity>
        <View style={{ height: 1.5, backgroundColor: theme.colors.divLine}} />
        <TouchableOpacity style={styles.btnOutline}>
          <Text style={styles.btnSignout}>Sign Out</Text>
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
      normalText: {
        color: theme.colors.textPrimary,
        fontSize:16,
        fontFamily:'dm-sans-regular',
        right:80,
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
        fontFamily:'dm-sans-regular',
        right:80,
    },
    smallmore: {
      color: theme.colors.textPrimary,
        fontSize:16,
        fontFamily:'dm-sans-regular',
        right:65,
    },
    btnSignout: {
    color: theme.colors.red,
    fontSize:16,
    fontFamily:'dm-sans-regular',
    right:80,
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
    btnIconArrowLeft: {
      position: 'absolute',
      left:1,
      height:20,
      width:20,

    },
    more: {
      color: theme.colors.textPrimary,
      fontSize: 20,
      fontFamily: "dm-sans-extrabold",
      left:130,
      bottom:50,
      alignItems: 'center',
      justifyContent: 'center',

    },
    profile: {
        color: theme.colors.textPrimary,
        fontSize: 19,
        fontFamily: "dm-sans-semibold",
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
