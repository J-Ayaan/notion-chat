// app/utils/storage.js
// localStorage를 사용한 채팅방 및 사용자 설정 관리 (Multi-room 지원)

import { generateRoomId, DEFAULT_CHANNELS } from './room';

const STORAGE_KEYS = {
  ROOMS: 'notionchat_rooms',
  CURRENT_ROOM: 'notionchat_current_room',
  CURRENT_USER: 'notionchat_current_user',
  SETTINGS: 'notionchat_settings',
  // 구버전 호환성
  OLD_CONFIG: 'notionchat_config',
};

/**
 * 채팅방 목록 가져오기
 * @returns {Object} 채팅방 객체 { roomId: roomData, ... }
 */
export const getRooms = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ROOMS);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to load rooms:', error);
    return {};
  }
};

/**
 * 특정 채팅방 정보 가져오기
 * @param {string} roomId - Room ID
 * @returns {Object|null} 채팅방 데이터
 */
export const getRoom = (roomId) => {
  const rooms = getRooms();
  return rooms[roomId] || null;
};

/**
 * 채팅방 추가 또는 업데이트
 * @param {string} roomId - Room ID
 * @param {Object} roomData - 채팅방 데이터
 * @returns {boolean} 성공 여부
 */
export const saveRoom = (roomId, roomData) => {
  try {
    const rooms = getRooms();
    rooms[roomId] = {
      ...roomData,
      id: roomId,
      lastAccessed: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    return true;
  } catch (error) {
    console.error('Failed to save room:', error);
    return false;
  }
};

/**
 * 새 채팅방 생성
 * @param {Object} params - { token, databaseId, roomName, userName }
 * @returns {string|null} Room ID
 */
export const createRoom = ({ token, databaseId, roomName, userName }) => {
  try {
    const roomId = generateRoomId(token, databaseId);
    const roomData = {
      id: roomId,
      name: roomName || '내 채팅방',
      token,
      databaseId,
      myName: userName || '익명',
      channels: [...DEFAULT_CHANNELS],
      createdAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
    };

    saveRoom(roomId, roomData);
    setCurrentRoom(roomId);
    return roomId;
  } catch (error) {
    console.error('Failed to create room:', error);
    return null;
  }
};

/**
 * 채팅방 삭제
 * @param {string} roomId - Room ID
 * @returns {boolean} 성공 여부
 */
export const deleteRoom = (roomId) => {
  try {
    const rooms = getRooms();
    delete rooms[roomId];
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));

    // 현재 채팅방이 삭제된 경우
    if (getCurrentRoom() === roomId) {
      const remainingRooms = Object.keys(rooms);
      if (remainingRooms.length > 0) {
        setCurrentRoom(remainingRooms[0]);
      } else {
        clearCurrentRoom();
      }
    }

    return true;
  } catch (error) {
    console.error('Failed to delete room:', error);
    return false;
  }
};

/**
 * 현재 선택된 채팅방 ID 가져오기
 * @returns {string|null}
 */
export const getCurrentRoom = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROOM);
  } catch (error) {
    console.error('Failed to get current room:', error);
    return null;
  }
};

/**
 * 현재 채팅방 설정
 * @param {string} roomId - Room ID
 * @returns {boolean} 성공 여부
 */
export const setCurrentRoom = (roomId) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROOM, roomId);
    // lastAccessed 업데이트
    const room = getRoom(roomId);
    if (room) {
      saveRoom(roomId, room);
    }
    return true;
  } catch (error) {
    console.error('Failed to set current room:', error);
    return false;
  }
};

/**
 * 현재 채팅방 초기화
 */
export const clearCurrentRoom = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ROOM);
    return true;
  } catch (error) {
    console.error('Failed to clear current room:', error);
    return false;
  }
};

/**
 * 현재 채팅방 데이터 가져오기
 * @returns {Object|null}
 */
export const getCurrentRoomData = () => {
  const roomId = getCurrentRoom();
  return roomId ? getRoom(roomId) : null;
};

/**
 * 채널 추가
 * @param {string} roomId - Room ID
 * @param {string} channelName - 채널 이름
 * @returns {boolean} 성공 여부
 */
export const addChannel = (roomId, channelName) => {
  try {
    const room = getRoom(roomId);
    if (!room) return false;

    if (!room.channels.includes(channelName)) {
      room.channels.push(channelName);
      return saveRoom(roomId, room);
    }
    return true;
  } catch (error) {
    console.error('Failed to add channel:', error);
    return false;
  }
};

/**
 * 채널 이름 변경
 * @param {string} roomId - Room ID
 * @param {string} oldName - 기존 채널 이름
 * @param {string} newName - 새 채널 이름
 * @returns {boolean} 성공 여부
 */
export const renameChannel = (roomId, oldName, newName) => {
  try {
    const room = getRoom(roomId);
    if (!room) return false;

    const index = room.channels.indexOf(oldName);
    if (index !== -1) {
      room.channels[index] = newName;
      return saveRoom(roomId, room);
    }
    return false;
  } catch (error) {
    console.error('Failed to rename channel:', error);
    return false;
  }
};

/**
 * 채널 삭제
 * @param {string} roomId - Room ID
 * @param {string} channelName - 채널 이름
 * @returns {boolean} 성공 여부
 */
export const deleteChannel = (roomId, channelName) => {
  try {
    const room = getRoom(roomId);
    if (!room) return false;

    room.channels = room.channels.filter((ch) => ch !== channelName);
    return saveRoom(roomId, room);
  } catch (error) {
    console.error('Failed to delete channel:', error);
    return false;
  }
};

/**
 * 사용자 프로필 가져오기
 * @returns {Object} 사용자 프로필
 */
export const getUserProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data
      ? JSON.parse(data)
      : {
          name: '익명',
          avatar: '😀',
          status: '온라인',
          statusMessage: '',
        };
  } catch (error) {
    console.error('Failed to load user profile:', error);
    return { name: '익명', avatar: '😀', status: '온라인' };
  }
};

/**
 * 사용자 프로필 저장
 * @param {Object} profile - 프로필 데이터
 * @returns {boolean} 성공 여부
 */
export const saveUserProfile = (profile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Failed to save user profile:', error);
    return false;
  }
};

/**
 * 전역 설정 가져오기
 * @returns {Object} 설정
 */
export const getSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data
      ? JSON.parse(data)
      : {
          pollingInterval: 5000,
          autoScroll: true,
          soundEnabled: false,
          theme: 'light',
        };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return { pollingInterval: 5000, autoScroll: true, soundEnabled: false };
  }
};

/**
 * 전역 설정 저장
 * @param {Object} settings - 설정
 * @returns {boolean} 성공 여부
 */
export const saveSettings = (settings) => {
  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Failed to save settings:', error);
    return false;
  }
};

/**
 * 구버전 설정 마이그레이션
 * @returns {boolean} 마이그레이션 수행 여부
 */
export const migrateOldConfig = () => {
  try {
    const oldConfig = localStorage.getItem(STORAGE_KEYS.OLD_CONFIG);
    if (!oldConfig) return false;

    const config = JSON.parse(oldConfig);
    const rooms = getRooms();

    // 이미 마이그레이션되었으면 스킵
    if (Object.keys(rooms).length > 0) {
      localStorage.removeItem(STORAGE_KEYS.OLD_CONFIG);
      return false;
    }

    // 구버전 데이터를 새 구조로 변환
    if (config.notionToken && config.databaseId) {
      const roomId = createRoom({
        token: config.notionToken,
        databaseId: config.databaseId,
        roomName: '내 채팅방',
        userName: config.userName || '익명',
      });

      // 설정 마이그레이션
      saveSettings({
        pollingInterval: config.pollingInterval || 5000,
        autoScroll: config.autoScroll !== false,
        soundEnabled: config.soundEnabled || false,
        theme: config.theme || 'light',
      });

      // 구버전 데이터 삭제
      localStorage.removeItem(STORAGE_KEYS.OLD_CONFIG);

      console.log('✅ 구버전 설정을 마이그레이션했습니다:', roomId);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Failed to migrate old config:', error);
    return false;
  }
};

/**
 * 모든 데이터 초기화
 * @returns {boolean} 성공 여부
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Failed to clear all data:', error);
    return false;
  }
};

/**
 * 데이터 Export (백업)
 * @returns {Object} 모든 데이터
 */
export const exportData = () => {
  return {
    rooms: getRooms(),
    currentRoom: getCurrentRoom(),
    userProfile: getUserProfile(),
    settings: getSettings(),
    exportedAt: new Date().toISOString(),
  };
};

/**
 * 데이터 Import (복원)
 * @param {Object} data - Export된 데이터
 * @returns {boolean} 성공 여부
 */
export const importData = (data) => {
  try {
    if (data.rooms) {
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(data.rooms));
    }
    if (data.currentRoom) {
      setCurrentRoom(data.currentRoom);
    }
    if (data.userProfile) {
      saveUserProfile(data.userProfile);
    }
    if (data.settings) {
      saveSettings(data.settings);
    }
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
};

// 구버전 호환성을 위한 export (deprecated)
export const loadConfig = () => {
  console.warn('loadConfig() is deprecated. Use getCurrentRoomData() instead.');
  return getCurrentRoomData();
};

export const saveConfig = (config) => {
  console.warn('saveConfig() is deprecated. Use createRoom() instead.');
  return false;
};

export const clearConfig = () => {
  console.warn('clearConfig() is deprecated. Use deleteRoom() instead.');
  return false;
};

export const updateConfig = (updates) => {
  console.warn('updateConfig() is deprecated. Use saveRoom() instead.');
  return false;
};
