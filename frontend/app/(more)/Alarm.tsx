import { View, Text, StyleSheet,Image, TouchableOpacity, StatusBar, Button  } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { theme } from '../theme';
import { router } from 'expo-router';

// const alarm = require("@/assets/sounds/Sound1.mp3");

export default function AlarmSetPage() {
    const [isSound1Enabled, setSound1Enabled] = useState(false);
    const [isSound2Enabled, setSound2Enabled] = useState(false);
    const [isSound3Enabled, setSound3Enabled] = useState(false);
    const [isSound4Enabled, setSound4Enabled] = useState(false);
    
    const toggleSound1 = () => {
        setSound1Enabled(prevState => !prevState);
    };
    const toggleSound2 = () => {
        setSound2Enabled(prevState => !prevState);
    };
    const toggleSound3 = () => {
        setSound3Enabled(prevState => !prevState);
    };
    const toggleSound4 = () => {
      setSound4Enabled(prevState => !prevState);
    };

    return (  
        <View style={styles.background}>
           <TouchableOpacity onPress={() => router.push("(more)")} style={styles.btnOutline}>
          <Image source={require('@/assets/icons/chevron-left.png')} style={styles.btnIconArrowLeft} />
          <Text style={styles.smallmore}>More</Text>
        </TouchableOpacity>
            <Text style={styles.general}>Alarms</Text>
            {/* //for prfile section */}
            <View>
        {/* <Text style={styles.btnText}>Account</Text> */}
        <View style={{ bottom: 25, right: 7 }}>
                <View style={{ height: 1.5, backgroundColor: theme.colors.divLine }} />
                <View style={styles.btnOutline}>
                    <TouchableOpacity onPress={toggleSound1}>
                        <Image
                            source={
                                isSound1Enabled
                                    ? require('@/assets/icons/checked.png')
                                    : require('@/assets/icons/notcheck.png')
                            }
                            style={styles.btntoggle}
                        />
                    </TouchableOpacity>
                    <View style={{ height: 1.5, backgroundColor: theme.colors.divLine }} />
                    <Text style={styles.btnText}>Sound 1</Text>
                </View>
                <View style={{ height: 1.5, backgroundColor: theme.colors.divLine }} />
                <View style={styles.btnOutline}>
                    <TouchableOpacity onPress={toggleSound2}>
                        <Image
                            source={
                                isSound2Enabled
                                ? require('@/assets/icons/checked.png')
                                : require('@/assets/icons/notcheck.png')
                            }
                            style={styles.btntoggle}
                        />
                    </TouchableOpacity>
                    <View style={{ height: 1.5, backgroundColor: theme.colors.divLine }} />
                    <Text style={styles.btnText}>Sound 2</Text>
                </View>
                <View style={{ height: 1.5, backgroundColor: theme.colors.divLine }} />
                <View style={styles.btnOutline}>
                    <TouchableOpacity onPress={toggleSound3}>
                        <Image
                            source={
                                isSound3Enabled
                                ? require('@/assets/icons/checked.png')
                                : require('@/assets/icons/notcheck.png')
                            }
                            style={styles.btntoggle}
                        />
                    </TouchableOpacity>
                    <View style={{ height: 1.5, backgroundColor: theme.colors.divLine }} />
                    <Text style={styles.btnText}>Sound 3</Text>
                </View>
                <View style={{ height: 1.5, backgroundColor: theme.colors.divLine }} />
                <View style={styles.btnOutline}>
                  
                    <TouchableOpacity onPress={toggleSound4}>
                        <Image
                            source={
                                isSound4Enabled
                                ? require('@/assets/icons/checked.png')
                                : require('@/assets/icons/notcheck.png')
                            }
                            style={styles.btntoggle}
                        />
                    </TouchableOpacity>
                    <View style={{ height: 1.5, backgroundColor: theme.colors.divLine }} />
                <Text style={styles.btnText}>Sound 4</Text>
                
                </View>
                
          
                
        </View>
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
    btntoggle: {
        right:80

    },
    btntoggle2: {
        left:60

    },
    btntoggle3: {
        left:90

    },
    btnText: {
        color: theme.colors.textPrimary,
        fontSize:16,
        fontFamily:'dm-sans-regular',
        right:60,
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
    general: {
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
    privacy: {
        marginTop:20,
        color: theme.colors.textPrimary,
        fontSize: 20,
        fontFamily: "dm-sans-extrabold",
        left:4,
        bottom:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    acc: {
        marginTop:80,
        color: theme.colors.textPrimary,
        fontSize: 20,
        fontFamily: "dm-sans-extrabold",
        left:4,
        bottom:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
