import React from 'react'
import {Tabs as MantineTabs} from '@mantine/core/cjs/Tabs/Tabs'
import {Tab as MantineTab} from '@mantine/core/cjs/Tabs/Tab/Tab'
import {createStyles} from '@mantine/core'

const useStyles = createStyles(theme => ({
  tabsListWrapper: {
    borderBottom: `solid 1px ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]
    }!important`
  },
  tabActive: {
    color: `${
      theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black
    }!important`,
    borderBottomColor: `${
      theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black
    }!important`
  }
}))

export const Tabs = props => {
  const { classes } = useStyles()
  return <MantineTabs {...props} classNames={classes} />
}

export const Tab = MantineTab
