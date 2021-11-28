import { off, onValue, ref } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import Alert from "./Alert";

export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
      () => window.matchMedia(query).matches
    );
  
    useEffect(() => {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);
  
      const listener = evt => setMatches(evt.matches);
  
      queryList.addListener(listener);
      return () => queryList.removeListener(listener);
    }, [query]);
  
    return matches;
};

export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowHeight;
}

export const useHover = () => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
      }
      return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
      };
    },
    // es-lint-disable-next-line react-hooks/exhaustive-deps
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}


export const useRevisions = listID => {
  const [revs, setRevs] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const listRef = ref(`revisions/${listID}`);
  useEffect(() => {
    setIsUpdating(true);
    
    onValue(listRef, snap => {
      setRevs(snap.val());
      setIsUpdating(false);
    }, err => {
      Alert.error(err);
      console.log(err);
    })
    
    return () => {
      off(listRef);
    }
  }, [listID]);

  return [revs, isUpdating];
}


